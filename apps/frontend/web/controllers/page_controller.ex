defmodule Frontend.PageController do
  alias Frontend.Page
  use Frontend.Web, :aliases
  use Frontend.Web, :controller

  def index(conn, params) do
    terms = Repo.all Term

    selected_term = List.last terms

    changeset = Page.changeset(%Page{}, params["page"])

    page = Changeset.apply_changes(changeset)

    query = limit(assoc(selected_term, :courses), 100)

    courses = Repo.all(Course.search(query, page.search_text))

    locals = %{
      changeset: changeset,
      courses: courses,
      page: page,
      terms: terms,
    }

    render(conn, "index.html", locals)
  end
end
