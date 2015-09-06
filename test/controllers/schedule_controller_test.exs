defmodule Recourse.ScheduleControllerTest do
  use Recourse.ConnCase

  @valid_attrs %{}
  @invalid_attrs %{}

  setup do
    conn = conn() |> put_req_header("accept", "application/json")
    {:ok, conn: conn}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, schedule_path(conn, :index)
    assert json_response(conn, 200)["data"] == %{}
  end
end
