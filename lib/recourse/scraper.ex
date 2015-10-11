defmodule Recourse.Scraper do
  use HTTPoison.Base
  use PatternTap
  alias Recourse.Course
  alias Recourse.Section
  alias Recourse.Repo

  import Ecto.Query

  @semesters %{
    spring: "01",
    summer: "05",
    winter: "09"
  }

  def process_url(url) do
    "https://www.uvic.ca/BAN2P/"
    <> case url do
      "courses" -> "bwckctlg.p_display_courses"
    end
  end

  def courses(args) do
    courses_query(args).body
    |> Floki.find(".nttitle a")
    |> Enum.map fn course ->
      course
      |> Floki.text
      |> parse :course
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
    |> String.split([" ", " - "])
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

  defp term(year, semester) do
    Integer.to_string(year) <> @semesters[semester]
  end
end
