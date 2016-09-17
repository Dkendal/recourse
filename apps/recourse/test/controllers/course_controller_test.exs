defmodule Recourse.CourseControllerTest do
  use Recourse.ConnCase

  alias Recourse.{Term, Course}

  describe "GET index" do
    test "returns OK", %{conn: conn} do
      term = Repo.insert! %Term{semester: :spring, year: 2020}
      conn = get conn, term_course_path(conn, :index, term)
      assert html_response(conn, 200)
    end
  end
end
