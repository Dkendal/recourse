defmodule Recourse.TermControllerTest do
  use Recourse.ConnCase

  alias Recourse.Term

  describe "GET index" do
    test "lists all entries on index", %{conn: conn} do
      conn = get conn, term_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing terms"
    end
  end

  describe "GET show" do
    test "shows chosen resource", %{conn: conn} do
      term = Repo.insert! %Term{}
      conn = get conn, term_path(conn, :show, term)
      assert html_response(conn, 200) =~ "Show term"
    end

    test "renders page not found when id is nonexistent", %{conn: conn} do
      assert_error_sent 404, fn ->
        get conn, term_path(conn, :show, -1)
      end
    end
  end
end
