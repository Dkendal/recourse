defmodule Recourse.Scraper do
  use HTTPoison.Base
  use Timex
  alias Recourse.Repo

  import Enum, only: [map: 2]
  import String, only: [split: 2]
  import Floki, only: [find: 2, text: 1]
  import Ecto.Query

  @semesters %{
    spring: "01",
    summer: "05",
    winter: "09"
  }

  @dateformat "{Mshort} {D}, {YYYY}"
  @timeformat "{h12}:{m} {am}"

  def process_url(url) do
    "https://www.uvic.ca/BAN2P/"
    <> case url do
      "courses?" <> q ->
        "bwckctlg.p_display_courses?" <> q

      "sections?" <> q ->
        "bwckctlg.p_disp_listcrse?" <> q
    end
  end

  def sections(args) do
    resp = sections_query(args).body
    |> find(".datadisplaytable")
    |> Enum.slice(1..-2) # the first and last rows are garbage
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
      |> transform_section
    end)
  end

  defp sections_query(args) do
    args
    |> sections_params
    |> URI.encode_query
    |> case do
      q -> get!("sections?" <> q)
    end
  end

  defp sections_params([term, subject, number]) do
    %{
      crse_in: number,
      schd_in: "",
      subj_in: subject,
      term_in: to_string(term)
    }
  end

  def transform_section(%{"Date Range" => date_range} = map) do
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
    |> transform_section
  end

  def transform_section(%{"Days" => days} = map) do
    days = String.codepoints days

    map
    |> Map.put(:days, days)
    |> Map.delete("Days")
    |> transform_section
  end

  def transform_section(%{"Time" => time} = map) do
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
    |> transform_section
  end

  def transform_section(map) do
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
