defmodule Recourse.ScheduleChannelTest do
  alias Recourse.{ScheduleChannel, Course, Repo, Term}
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

    create :section, course: course

    {
      :ok,
      course: course,
      socket: socket,
      term: term
    }
  end

  test "[terms:search] requesting terms", %{
    socket: socket,
    course: %{id: course_id},
    term: %{id: term_id}
  } do

    ref = push socket, "terms:search", %{}
    assert_reply ref, :ok, %{
      payload: [
        %{id: ^term_id,
          courses: [
            %{id: ^course_id}]}]}
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
