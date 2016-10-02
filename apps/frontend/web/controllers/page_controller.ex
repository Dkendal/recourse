defmodule Frontend.PageController do
  use Frontend.Web, :aliases
  use Frontend.Web, :controller

  def index(conn, _params) do
    terms = Repo.all Term
    render conn, "index.html", terms: terms
  end
end
