defmodule Recourse.Scraper.Section do
  use Timex

  import Recourse.Scraper
  import Enum, only: [map: 2]
  import String, only: [split: 2]
  import Floki, only: [find: 2, text: 1]

  @dateformat "{Mshort} {D}, {YYYY}"
  @timeformat "{h12}:{m} {am}"

  def all(args) do
    resp =
      query(args).body
      |> find(".datadisplaytable")
      # the first and last rows are garbage
      |> Enum.slice(1..-2)
      |> find("tr")
      |> map(fn tr ->
        tr
        |> find("th, td")
        |> map(&text/1)
      end)
      |> Enum.chunk(2)
      |> map(fn [th, td] ->
        Enum.zip(th, td)
        |> Enum.into(%{})
        |> transform
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
      |> map fn date ->
        date
        |> DateFormat.parse(@dateformat)
        |> case do
          {:ok, dt} ->
            datetime_to_date(dt)
        end
      end

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

  def transform(%{"Time" => time} = map) do
    [time_start, time_end] =
      time
      |> split(" - ")
      |> map fn time ->
        time
        |> DateFormat.parse(@timeformat)
        |> case do
          {:ok, dt} ->
            datetime_to_time(dt)
        end
      end

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
    |> case do
      map -> Map.merge %Recourse.Section{}, map
    end
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
end
