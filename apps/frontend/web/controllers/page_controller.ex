defmodule Frontend.PageController do
  alias Frontend.Page
  use Frontend.Web, :aliases
  use Frontend.Web, :controller

  def index(conn, params) do
    terms = Repo.all Term

    selected_term = List.last terms

    changeset = Page.changeset(%Page{}, page_params(params))

    page = Changeset.apply_changes(changeset)

    query = limit(assoc(selected_term, :courses), 100)

    query = if page.search_text == "" do
      query
    else
      Course.search(query, page.search_text)
    end

    courses = Repo.all(query)

    locals = %{
      changeset: changeset,
      courses: courses,
      page: page,
      terms: terms,
    }

    render(conn, "index.html", locals)
  end

  def page_params(params) do
    get_in(params, [Access.key("page", %{})])
  end
end
