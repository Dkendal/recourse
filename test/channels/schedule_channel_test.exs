defmodule Recourse.ScheduleChannelTest do
  alias Recourse.ScheduleChannel
  alias Recourse.Course
  alias Recourse.Term
  alias Recourse.Repo
  use Recourse.ChannelCase
  import Recourse.Factory

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(ScheduleChannel, "schedules:planner")

    term = create :term,
      year: 2015,
      semester: :winter

    course = create :course,
      term: term,
      subject: "CSC",
      number: "100"

    {:ok, socket: socket, term: term, course: course}
  end

  test "[courses:search] requesting courses", %{socket: socket, course: course} do
    ref = push socket, "courses:search", %{}
    assert_reply ref, :ok, %{payload: [course]}
  end

  test "[terms:search] requesting terms", %{socket: socket, term: term} do
    ref = push socket, "terms:search", %{}
    assert_reply ref, :ok, %{payload: []}
  end

  test "[make_schedule] returns a schedule for the given courses", %{socket: socket} do
    ref = push socket, "make_schedule", %{
      "course_ids" => [],
      "settings" => %{
        "startTime" => "00:00:00",
        "endTime" => "00:00:00"
      }
    }

    assert_reply ref, :ok, %{
      payload: %{
        maxEndHour: "",
        minStartHour: "",
        sections: []
      }
    }
  end
end
