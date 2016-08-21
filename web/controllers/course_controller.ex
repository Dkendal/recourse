defmodule Recourse.CourseController do
  alias Recourse.{Term, Course}
  use Recourse.Web, :controller

  def index(conn, %{"term_id" => id}) do
    term =
      Term
      |> Repo.get!(id)
      |> Repo.preload(:courses)

    render(conn, "index.html", term: term)
  end
end
