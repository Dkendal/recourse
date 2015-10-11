defmodule Recourse.Scraper do
  use HTTPoison.Base
  use Timex
  alias Recourse.Course
  alias Recourse.Section
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
      "courses" ->
        "bwckctlg.p_display_courses"

      "course?" <> q ->
        "bwckctlg.p_disp_listcrse?" <> q
    end
  end

  def course(args) do
    resp = course_query(args).body
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

  def courses(args) do
    courses_query(args).body
    |> find(".nttitle a")
    |> map fn course ->
      course
      |> text
      |> parse :course
    end
  end

  defp course_query(args) do
    args
    |> course_params
    |> URI.encode_query
    |> case do
      q -> get!("course?" <> q)
    end
  end

  defp courses_query(args) do
    args
    |> courses_params
    |> URI.encode_query
    |> case do
      q -> post!("courses", q)
    end
  end

  defp course_params([year, semester, subject, number]) do
    %{
      crse_in: number,
      schd_in: "",
      subj_in: subject,
      term_in: term(year, semester)
    }
  end

  defp courses_params([year, semester, subjects, course_start, course_end]) do
    Enum.concat(
      [ term_in: term(year,semester),
        sel_subj: "",
        sel_levl: "",
        sel_schd: "",
        sel_coll: "",
        sel_divs: "",
        sel_dept: "",
        sel_attr: "",
        sel_crse_strt: course_start,
        sel_crse_end: course_end
      ],
      Enum.flat_map(
        subjects,
        & [sel_subj: &1]))
  end

  def parse(text, :course) do
    text
    |> split([" ", " - "])
    |> case do
      [subject, number | title] ->
        %Recourse.Course{
          subject: subject,
          number: number,
          title: Enum.join(title, " ")
        }
    end
  end
  def parse(_, _), do: :error

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

  defp term(year, semester) do
    Integer.to_string(year) <> @semesters[semester]
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
