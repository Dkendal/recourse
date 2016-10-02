defmodule Frontend.PageController do
  alias Frontend.Page
  use Frontend.Web, :aliases
  use Frontend.Web, :controller

  def index(conn, _params) do
    terms = Repo.all preload(Term, [:courses])
    selected_term = List.last terms

    page = %Page{selected_term_id: selected_term.id}
           |> Page.changeset(%{})

    locals = %{
      page: page,
      terms: terms
    }

    render(conn, "index.html", locals)
  end
end
