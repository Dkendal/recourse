defmodule Recourse.ScheduleChannelTest do
  use Recourse.ChannelCase
  alias Recourse.ScheduleChannel
  alias Recourse.Course
  alias Recourse.Term
  alias Recourse.Repo
  import Repo, only: [insert: 1]

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(ScheduleChannel, "schedules:planner")

    {:ok, term} = insert %Term{
      year: 2015,
      semester: :winter
    }

    {:ok, course} = insert %Course{
      term_id: term.id,
      subject: "CSC",
      number: "100"
    }

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
    assert_reply ref, :ok, %{payload: []}
  end
end
