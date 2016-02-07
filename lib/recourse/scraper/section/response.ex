defmodule Recourse.Scraper.Section.Response do
  use Timex
  import Enum, only: [map: 2]
  import String, only: [split: 2]
  import Floki, only: [find: 2, text: 1]

  @doc """
  Parses the content found in a section html request. Returns all sections found
  along with their meeting times.
  """
  @spec parse(String.t, Recourse.Course.t) :: [%Ecto.Changeset{}]
  def parse(body, courses) do
    body
    |> find(".pagebodydiv > .datadisplaytable[summary=\"This layout table is used to present the sections found\"]")
    |> List.first
    |> wrap_empty_section
    |> elem(2)
    |> Enum.slice(1..-1)
    |> Enum.chunk(2)
    |> map(fn [header, body] ->
      tokens =
        header
        |> find("a")
        |> text
        |> String.split(" - ")

      name = Enum.fetch!(tokens, -1)
      course_name = Enum.fetch!(tokens, -2)
      crn = Enum.fetch!(tokens, -3)

      [subject, number] = course_name |> String.split(" ")

      # don't do anything if there isn't a matching course
      course = courses
                |> Enum.find(& &1.subject == subject && &1.number == number)

      case course do
        nil ->
          nil

        %{id: id} ->
          header_attrs = %{
            crn: crn,
            name: name
          }

          meeting_times = parse_meeting_time_info(body)
          section =
            body
            |> parse_section_info
            |> Dict.merge(header_attrs)

          %Recourse.Section{}
            |> Ecto.Changeset.change(section)
            |> Ecto.Changeset.put_assoc(:meeting_times, meeting_times)
            |> Ecto.Changeset.put_change(:course_id, id)
      end
    end)
    |> Enum.reject(&is_nil/1)
  end

  @spec parse_meeting_time_info(Floki.html_tree) :: %{}
  def parse_meeting_time_info(body) do
    body
    |> find(".datadisplaytable")
    |> find("tr")
    |> map(&get_row_content/1)
    |> extract_meeting_time
    |> Enum.map(fn attrs ->
      %Recourse.MeetingTime{}
      |> Ecto.Changeset.change(attrs)
    end)
  end

  @spec parse_section_info(Floki.html_tree) :: %{}
  def parse_section_info(body) do
    body
    |> elem(2)
    |> List.first
    |> elem(2)
    |> parse_section
  end

  def transform(%{"Date Range" => date_range} = map) do
    [date_start, date_end] =
      date_range
      |> split(" - ")
      |> map(&parse_date/1)

    map
    |> Map.put(:date_start, date_start)
    |> Map.put(:date_end, date_end)
    |> Map.delete("Date Range")
    |> transform
  end

  def transform(%{"Days" => days} = map) do
    days = String.codepoints days

    map
    |> Map.put(:days, days)
    |> Map.delete("Days")
    |> transform
  end

  @type transform(Map) :: Map
  def transform(%{"Time" => "TBA"} = map) do
    map
    |> Map.delete("Time")
    |> transform
  end

  def transform(%{"Time" => time} = map) do
    [start_time, end_time] =
      time
      |> split(" - ")
      |> map(&parse_time/1)

    map
    |> Map.put(:start_time, start_time)
    |> Map.put(:end_time, end_time)
    |> Map.delete("Time")
    |> transform
  end

  def transform(map) do
    map
    |> Map.put(:type, map["Type"])
    |> Map.put(:location, map["Where"])
    |> Map.delete("Instructors")
    |> Map.delete("Schedule Type")
    |> Map.delete("Type")
    |> Map.delete("Where")
  end

  defp datetime_to_date(dt) do
    %Ecto.Date{
      day: dt.day,
      month: dt.month,
      year: dt.year
    }
  end

  defp datetime_to_time(dt) do
    %Ecto.Time{
      hour: dt.hour,
      min: dt.minute,
      sec: dt.second
    }
  end

  defp extract_meeting_time([]) do
    %{}
  end

  defp extract_meeting_time([headers]), do: []
  defp extract_meeting_time([th, td | rest]) do
    result = Enum.zip(th, td)
    |> Enum.into(%{})
    |> transform
    [result | extract_meeting_time([th | rest])]
  end

  defp get_row_content tr do
    tr
      |> find("th, td")
      |> map(&text/1)
  end

  defp parse_time t do
    parse t, "{h12}:{m} {am}", &datetime_to_time/1
  end

  defp parse_date t do
    parse t, "{Mshort} {D}, {YYYY}", &datetime_to_date/1
  end

  defp parse "TBA", _, _ do
    nil
  end

  defp parse t, format, conversion_fn do
    {:ok, dt} = DateFormat.parse(t, format)
    conversion_fn.(dt)
  end

  defp parse_section(tree, acc \\ %{})

  defp parse_section([{"span", _, [label]}, value|t], acc) when is_binary(value) do
    acc_p = parse_section_attr(label, value, acc)
    parse_section(t, acc_p)
  end

  defp parse_section([{"br", _, _}, value|t], acc) when is_binary(value) do
    acc_p =
      value
      |> String.strip
      |> parse_section_attr(acc)

    parse_section(t, acc_p)
  end

  defp parse_section([_h|t], acc) do
    parse_section(t, acc)
  end

  defp parse_section([], acc) do
    acc
  end

  defp parse_section_attr("Registration Dates: ", value, acc) do
    [from, to] =
      value
      |> String.split(" to ")
      |> map(& String.strip(&1) |> parse_date)
    acc
    |> Dict.put(:registration_start, from)
    |> Dict.put(:registration_end, to)
  end

  defp parse_section_attr(_label, _value, acc) do
    acc
  end

  defp parse_section_attr(val, acc) do
    val
    |> String.split(" ")
    |> Enum.reverse
    |> case do
      ["Credits", v] ->
        {credits, ""} = Float.parse(v)
        Dict.put(acc, :credits, credits)

      ["Campus", v] ->
        Dict.put(acc, :campus, v)

      ["Method", "Instructional"|v] ->
        v = Enum.join(Enum.reverse(v), " ")
        Dict.put(acc, :instructional_method, v)

      ["Type", "Schedule"|v] ->
        v = Enum.join(Enum.reverse(v), " ")
        Dict.put(acc, :schedule_type, v)

      _ ->
        acc
    end
  end

  def wrap_empty_section(nil), do: {nil, [], []}
  def wrap_empty_section(x), do: x
end
