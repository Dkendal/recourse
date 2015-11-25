defmodule Recourse.ScheduleChannelTest do
  use Recourse.ChannelCase

  alias Recourse.ScheduleChannel

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(ScheduleChannel, "schedules:planner")

    {:ok, term} = Recourse.Repo.insert %Recourse.Term{
      year: 2015,
      semester: :winter
    }

    {:ok, course} = Recourse.Repo.insert %Recourse.Course{
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
    assert_reply ref, :ok, %{payload: [term]}
  end

  test "[make_schedule] returns a schedule for the given courses", %{socket: socket} do
    ref = push socket, "make_schedule", []
    assert_reply ref, :ok, %{payload: []}
  end
end
