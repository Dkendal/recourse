defmodule Recourse.SectionControllerTest do
  use Recourse.ConnCase

  alias Recourse.Section
  @valid_attrs %{campus: "some content", credits: "120.5", date_end: "some content", date_start: "some content", days: [], instructional_method: "some content", location: "some content", registration_code: "some content", registration_end: "some content", registration_start: "some content", schedule_type: "some content", time_end: "14:00:00", time_start: "14:00:00"}
  @invalid_attrs %{}

  setup do
    conn = conn() |> put_req_header("accept", "application/json")
    {:ok, conn: conn}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, section_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    section = Repo.insert! %Section{}
    conn = get conn, section_path(conn, :show, section)
    assert json_response(conn, 200)["data"] == %{"id" => section.id,
      "registration_code" => section.registration_code,
      "schedule_type" => section.schedule_type,
      "time_start" => section.time_start,
      "time_end" => section.time_end,
      "days" => section.days,
      "location" => section.location,
      "date_start" => section.date_start,
      "date_end" => section.date_end,
      "registration_start" => section.registration_start,
      "registration_end" => section.registration_end,
      "campus" => section.campus,
      "credits" => section.credits,
      "instructional_method" => section.instructional_method,
      "course_id" => section.course_id,
      "term_id" => section.term_id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_raise Ecto.NoResultsError, fn ->
      get conn, section_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, section_path(conn, :create), section: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Section, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, section_path(conn, :create), section: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    section = Repo.insert! %Section{}
    conn = put conn, section_path(conn, :update, section), section: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Section, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    section = Repo.insert! %Section{}
    conn = put conn, section_path(conn, :update, section), section: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    section = Repo.insert! %Section{}
    conn = delete conn, section_path(conn, :delete, section)
    assert response(conn, 204)
    refute Repo.get(Section, section.id)
  end
end
