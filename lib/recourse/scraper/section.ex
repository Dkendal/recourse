defmodule Recourse.Scraper.Section do
  alias Recourse.{Course, Section}
  alias Recourse.Scraper.Section.{Request, Response}
  alias Recourse.Section
  import Recourse.Scraper

  @spec all(Course.t) :: [Section.t]
  def all(course) do
    query(course)
    |> Response.parse
    |> Enum.map(fn attrs ->
      %Section{}
      |> Ecto.Changeset.change(attrs)
      |> Ecto.Changeset.put_change(:course_id, course.id)
    end)
  end

  def query(course) do
    get!("sections?" <> Request.to_params(course))
  end
end
