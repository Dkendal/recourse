defmodule Frontend.PageController do
  alias Frontend.Page
  use Frontend.Web, :aliases
  use Frontend.Web, :controller

  def index(conn, _params) do
    terms = Repo.all preload(Term, [:courses])
    page = Page.changeset(%Page{}, %{})
    page = Ecto.Changeset.put_assoc(page, :terms, terms)
    render conn, "index.html", page: page
  end
end
