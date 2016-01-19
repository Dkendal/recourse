defmodule Recourse.ScheduleTest do
  alias Recourse.Schedule
  use Recourse.Case

  setup_all do
    SeatsHelper.mock_registration_info
    :ok
  end

  describe "build/1" do
    it "returns a schedule for the selected courses" do
      term = create(:term)

      csc = create(:course, term: term)
      engl = create(:course, term: term)

      csc_lecture = build(:section, course: csc)
                    |> as_lecture
                    |> create

      csc_tutorial = build(:section, course: csc)
                      |> as_tutorial
                      |> create

      engl_lecture = build(:section, course: engl)
                      |> as_tutorial
                      |> create

      sections = Schedule.build(%{
        "course_ids" => [csc.id, engl.id],
        "settings" => %{
          "startTime" => "00:00:00",
          "endTime" => "00:00:00"
        }
      })

      assert length(sections) == 3
      assert Enum.any? sections, & &1.id == csc_lecture.id
      assert Enum.any? sections, & &1.id == csc_tutorial.id
      assert Enum.any? sections, & &1.id == engl_lecture.id

      assert %Recourse.MeetingTime{} = hd csc_lecture.meeting_times
    end
  end

  describe "components/1" do
    it "groups sections based on conflicts" do
      Schedule.components(build_list(2, :section))
    end
  end
end
