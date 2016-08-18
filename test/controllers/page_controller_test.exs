defmodule Recourse.PageControllerTest do
  use Recourse.ConnCase

  describe "GET index" do
    test "returns ok", %{conn: conn} do
      conn = get conn, "/"
      assert html_response(conn, 200) =~ "<body>"
    end
  end
end
