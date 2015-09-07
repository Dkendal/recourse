defmodule Recourse.ScheduleControllerTest do
  use Recourse.ConnCase

  alias Recourse.Course

  @valid_attrs %{}
  @invalid_attrs %{}

  setup do
    conn = conn() |> put_req_header("accept", "application/json")

    days_of_the_week = ~w(m w)
    start_time = %Ecto.Time{hour: 10, min: 0, sec: 0}

    courses = for _ <- 1..6 do
      Repo.insert! %Course{}
    end

    for course <- courses, h <- 0..3 do
      build(course, :sections, %{
        time_start: start_time |> add_hours(h),
        time_end:   start_time |> add_hours(h) |> add_mins(50),
        days:       days_of_the_week})
      |> Repo.insert!
    end

    course_ids = for course <- courses, do: course.id

    {:ok, conn: conn, course_ids: course_ids}
  end

  test "lists all entries on index", %{conn: conn, course_ids: course_ids} do
    conn = get conn, schedule_path(conn, :index, course_ids: course_ids)
    result = json_response(conn, 200)["data"]

    # has as a section for each course
    assert length(result) == length course_ids
    result = Enum.sort result
    # each section coresponds to a single course
    assert course_ids == (for section <- result, do: section["course"]["id"])
  end

  defp add_hours %{hour: h} = time, hours do
    %{time | hour: h + hours}
  end

  defp add_mins %{min: m} = time, mins do
    %{time | min: m + mins}
  end
end
