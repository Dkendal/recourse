defmodule Recourse.InstructorControllerTest do
  use Recourse.ConnCase

  alias Recourse.Instructor
  @valid_attrs %{firstname: "some content", lastname: "some content"}
  @invalid_attrs %{}

  setup do
    conn = conn() |> put_req_header("accept", "application/json")
    {:ok, conn: conn}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, instructor_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    instructor = Repo.insert! %Instructor{}
    conn = get conn, instructor_path(conn, :show, instructor)
    assert json_response(conn, 200)["data"] == %{"id" => instructor.id,
      "firstname" => instructor.firstname,
      "lastname" => instructor.lastname}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_raise Ecto.NoResultsError, fn ->
      get conn, instructor_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, instructor_path(conn, :create), instructor: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Instructor, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, instructor_path(conn, :create), instructor: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    instructor = Repo.insert! %Instructor{}
    conn = put conn, instructor_path(conn, :update, instructor), instructor: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Instructor, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    instructor = Repo.insert! %Instructor{}
    conn = put conn, instructor_path(conn, :update, instructor), instructor: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    instructor = Repo.insert! %Instructor{}
    conn = delete conn, instructor_path(conn, :delete, instructor)
    assert response(conn, 204)
    refute Repo.get(Instructor, instructor.id)
  end
end
