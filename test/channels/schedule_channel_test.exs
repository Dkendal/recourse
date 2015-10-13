defmodule Recourse.ScheduleChannelTest do
  use Recourse.ChannelCase

  alias Recourse.ScheduleChannel

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(ScheduleChannel, "schedules:planner")

    {:ok, socket: socket}
  end

  test "[courses:search] requesting courses", %{socket: socket} do
    ref = push socket, "courses:search", %{}
    assert_reply ref, :ok, %{payload: []}
  end

  test "[make_schedule] returns a schedule for the given courses", %{socket: socket} do
    ref = push socket, "make_schedule", []
    assert_reply ref, :ok, %{payload: []}
  end
end
