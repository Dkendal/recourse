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

  defp process({courses, html}) do
    html
    |> Response.parse(courses)
  end
end
