defmodule Recourse.PageControllerTest do
  use Recourse.ConnCase

  test "GET /" do
    conn = get conn(), "/"
    assert html_response(conn, 200) =~ "<body>"
  end
end
