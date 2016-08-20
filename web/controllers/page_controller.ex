defmodule Recourse.PageController do
  use Recourse.Web, :controller

  def about(conn, _params) do
    render conn, "about.html"
  end

  def index(conn, _params) do
    terms = Repo.all Recourse.Term

    render conn, "index.html", terms: terms
  end
end
