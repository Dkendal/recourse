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

    selected_sections = Repo.all from s in Section,
    where: s.course_id in ^page.selected_course_ids,
    preload: [:meeting_times]

    solver_result = if length(page.selected_course_ids) > 0 do
      Solver.Server.start
      solution = Solver.Server.solve(selected_sections)
      Solver.Server.stop
      solution
    end

    solution = case solver_result do
      {:error, :unsat} -> []
      x when is_list(x) -> x
      _ -> []
    end

    locals = %{
      selected_sections: selected_sections,
      solver_result: solver_result,
      changeset: changeset,
      courses: courses,
      page: page,
      terms: terms,
      solution: solution
    }

    render(conn, "index.html", locals)
  end

  def page_params(params) do
    get_in(params, [Access.key("page", %{})])
  end
end
