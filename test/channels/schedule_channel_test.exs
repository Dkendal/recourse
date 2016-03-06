defmodule Recourse.ScheduleChannelTest do
  alias Recourse.{ScheduleChannel, Repo, Section}
  alias Ecto.Time
  use Recourse.ChannelCase
  import Recourse.Factory

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(ScheduleChannel, "schedules:planner")


    {:ok, socket: socket}
  end

  describe "terms:search" do
    it "returns all the terms", %{socket: socket} do
      expected_term = create(:term)

      expected_course = build(
        :course,
        sections: [build(:section)],
        term: expected_term)
        |> create

      build(:course, term: expected_term)
      |> create

      ref = push socket, "terms:search", %{}

      # is ok
      assert_reply ref, :ok, response

      assert response.payload |> length == 1

      term = response.payload |> hd

      # returns all terms
      assert term.id == expected_term.id

      # only includeds courses with sections
      assert term.courses |> length == 1

      course = term.courses |> hd

      # returns the expected courses
      assert course.id == expected_course.id
    end
  end

  describe "make_schedule" do
    it "returns a schedule for the given courses", %{socket: socket} do
      eight_am = %Time{hour: 8, min: 0, sec: 0}
      six_pm = %Time{hour: 18, min: 0, sec: 0}

      term = create :term

      eight_am_class = build(:meeting_time, start_time: eight_am, days: ~W(M))
                        |> duration(120)

      six_pm_class = build(:meeting_time, start_time: six_pm, days: ~W(R))
                      |> duration(180)

      math = create(
        :course,
        term: term,
        sections: [
          build(:section, meeting_times: [eight_am_class])
        ])

      csc = create(
        :course,
        term: term,
        sections: [
          build(:section, meeting_times: [six_pm_class])
        ])

      ref = push socket, "make_schedule", %{
        "course_ids" => [csc.id, math.id],
        "settings" => %{
          "startTime" => "2016-02-04T00:00:00.000Z",
          "endTime" => "2016-02-04T00:00:00.000Z",
        }
      }

      assert_reply ref, :ok, %{
        payload: %{
          latestEndTime: max_end_hour,
          earliestStartTime: min_start_hour,
          schedule: schedule,
        }
      }

      assert [[%Section{}], [%Section{}]] = schedule

      assert %{hour: 21, min: 0} = max_end_hour
      assert %{hour: 8, min: 0} = min_start_hour
    end
  end
end
