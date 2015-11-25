defmodule Recourse.ScheduleTest do
  use ExUnit.Case
  alias Recourse.Repo
  alias Recourse.Term
  alias Recourse.Course
  alias Recourse.Section
  alias Ecto.Time

  setup do
    {:ok, term} = Repo.insert %Term{year: 2015, semester: :summer}

    {:ok, csc} = Repo.insert %Course{
      subject: "CSC", number: "100", term_id: term.id
    }

    {:ok, math} = Repo.insert %Course{
      subject: "MATH", number: "100", term_id: term.id
    }

    {:ok, csc_lecture} = Repo.insert %Section{
      days: ~W(M W R),
      schedule_type: "Lecture",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: csc.id
    }

    {:ok, csc_tutorial} = Repo.insert %Section{
      days: ~W(T),
      schedule_type: "Tutorial",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: csc.id
    }

    {:ok, math_lecture} = Repo.insert %Section{
      days: ~W(M W R),
      schedule_type: "Lecture",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: math.id
    }

    {:ok, math_lab} = Repo.insert %Section{
      days: ~W(F),
      schedule_type: "Lab",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: math.id
    }

    {:ok, ids: [math.id, csc.id]}
  end

  test "[build/1]", %{ids: ids} do
    sections = Recourse.Schedule.build(ids)
    assert Enum.count(sections) == 4
  end
end
