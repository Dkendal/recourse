defmodule Recourse.TermController do
  use Recourse.Web, :controller

  alias Recourse.Term

  def index(conn, _params) do
    terms = Repo.all(Term)
    render(conn, "index.html", terms: terms)
  end

  def show(conn, %{"id" => id}) do
    term = Repo.get!(Term, id)
    render(conn, "show.html", term: term)
  end
end
