defmodule Recourse.CourseController do
  alias Recourse.{Term, Course, ScheduleForm}
  use Recourse.Web, :controller

  def index(conn, %{"term_id" => id} = params) do
    term =
      Term
      |> Repo.get!(id)
      |> Repo.preload(:courses)

    render(conn, "index.html", term: term)
  end

  def create(conn, %{"term_id" => id} = params) do
    term =
      Term
      |> Repo.get!(id)
      |> Repo.preload(:courses)

    render(conn, "index.html", term: term)
  end
end
