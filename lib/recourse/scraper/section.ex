defmodule Recourse.Scraper.Section do
  alias Recourse.{Course, Section}
  alias Recourse.Scraper.Section.{Request, Response}
  alias Recourse.Section

  @spec all(Course.t) :: [Section.t]
  def all(courses) do
    courses
    |> Request.query_plan
    |> Request.execute
    |> Enum.flat_map(&process/1)
  end

  defp process({[course], html}) do
    html
    |> Response.parse
    |> Enum.map(&put_course(&1, course))
  end

  defp put_course(changeset, %{id: id}) do
    changeset
    |> Ecto.Changeset.put_change(:course_id, id)
  end
end
