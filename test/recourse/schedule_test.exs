defmodule Recourse.ScheduleTest do
  alias Recourse.Schedule
  use Recourse.Case

  test "[build/1]" do
    term = create(:term, year: 2016, semester: :summer)
    csc = create(:course, subject: "CSC", number: "100", term: term)
    engl = create(:course, subject: "ENGL", number: "100", term: term)

    lecture = build(:section,
      time_start: "12:00:00",
      time_end: "13:50:00",
      course: csc
    )
    |> as_lecture
    |> cast
    |> create

    tutorial = build(:section,
      time_start: cast_time("14:00:00"),
      time_end: cast_time("15:50:00"),
      course: csc
    )
    |> as_tutorial
    |> cast
    |> create

    sections = Schedule.build(%{
      "course_ids" => [csc.id, engl.id],
      "settings" => %{
        "startTime" => "00:00:00",
        "endTime" => "00:00:00"
      }
    })

    assert length(sections) == 2
    assert Enum.any? sections, & &1.id == lecture.id
    assert Enum.any? sections, & &1.id == tutorial.id
  end
end
