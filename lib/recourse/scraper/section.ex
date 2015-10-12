defmodule Recourse.Scraper.Section do
  use Timex

  import Recourse.Scraper
  import Enum, only: [map: 2]
  import String, only: [split: 2]
  import Floki, only: [find: 2, text: 1]

  alias Recourse.Section

  def all(args) do
    body = query(args).body

    body
    |> find(".pagebodydiv > .datadisplaytable[summary=\"This layout table is used to present the sections found\"]")
    |> List.first
    |> elem(2)
    |> Enum.slice(1..-1)
    |> Enum.chunk(2)
    |> map(fn [header, body] ->
      tokens =
        header
        |> find("a")
        |> text
        |> String.split(" - ")

      {:ok, registration_code} = Enum.fetch(tokens, 1)
      {:ok, name} = Enum.fetch(tokens, -1)

      header_attrs = %{
        registration_code: registration_code,
        name: name
      }

      other_attrs =
        body
        |> elem(2)
        |> List.first
        |> elem(2)
        |> parse_section

      course_attrs =
        body
        |> find(".datadisplaytable")
        |> find("tr")
        |> map(&get_row_content/1)
        |> build_attrs
        |> Dict.merge(header_attrs)
        |> Dict.merge(other_attrs)
        |> Dict.put(:course_id, args.course.id)

      Section.changeset(%Section{}, course_attrs)
    end)
  end

  defp query(args) do
    args
    |> params
    |> URI.encode_query
    |> case do
      q -> get!("sections?" <> q)
    end
  end

  defp params(%{term: t, course: c}) do
    %{
      crse_in: c.number,
      schd_in: "",
      subj_in: c.subject,
      term_in: to_string(t)
    }
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
  def transform(%{"Time" => time} = map) do
    [time_start, time_end] =
      time
      |> split(" - ")
      |> map(&parse_time/1)

    map
    |> Map.put(:time_start, time_start)
    |> Map.put(:time_end, time_end)
    |> Map.delete("Time")
    |> transform
  end

  def transform(map) do
    map
    |> Map.put(:schedule_type, map["Schedule Type"])
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

  defp build_attrs([th, td]) do
    attrs =
      Enum.zip(th, td)
      |> Enum.into(%{})
      |> transform
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

  defp parse t, format, conversion_fn do
    {:ok, dt} = DateFormat.parse(t, format)
    conversion_fn.(dt)
  end

  defp parse_section([{"span", _, [label]}, value|t], acc \\ %{}) when is_binary(value) do
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

  defp parse_section([h|t], acc) do
    parse_section(t, acc)
  end

  defp parse_section([], acc) do
    acc
  end

  defp parse_section_attr("Registration Dates: ", value, acc) do
    [from, to] =
      value
      |> String.split(" to ")
      |> map fn s ->
        s
        |> String.strip
        |> parse_date
      end

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
        Dict.put(acc, :credits, v)

      ["Campus", v] ->
        Dict.put(acc, :campus, v)

      ["Method", "Instructional"|v] ->
        v = Enum.join(Enum.reverse(v), " ")
        Dict.put(acc, :instructional_method, v)

      v ->
        acc
    end
  end
end
