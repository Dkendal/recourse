defmodule Recourse.ScheduleChannelTest do
  alias Recourse.{ScheduleChannel, Repo}
  use Recourse.ChannelCase
  import Recourse.Factory


  setup_all do
    SeatsHelper.mock_registration_info
    :ok
  end

  setup do
    {:ok, _, socket} = socket("user_id", %{some: :assign})
                        |> subscribe_and_join(ScheduleChannel, "schedules:planner")


    {:ok, socket: socket}
  end

  describe "terms:search" do
    it "returns all the terms", %{socket: socket} do
      expected_term = create(:term)

      expected_course = build(:course, term: expected_term)
                        |> with_section
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
end
