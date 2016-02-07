defmodule Recourse.Scraper.Section do
  alias Recourse.{Course, Section}
  alias Recourse.Scraper.Section.{Request, Response}
  alias Recourse.Section

  @spec all(Course.t) :: [Section.t]
  def all([course] = courses) do
    courses
    |> Request.query_plan
    |> Request.execute
    |> case do
      [{_courses, html}] -> html
    end
    |> Response.parse
    |> Enum.map(fn attrs ->
      attrs
      |> Ecto.Changeset.put_change(:course_id, course.id)
    end)
  end
end
