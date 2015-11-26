defmodule Recourse.ScheduleTest do
  use ExUnit.Case
  alias Recourse.Repo
  alias Recourse.Term
  alias Recourse.Course
  alias Recourse.Section
  alias Recourse.Schedule
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

    {:ok, math_lecture_conflict} = Repo.insert %Section{
      days: ~W(M W R),
      schedule_type: "Lecture",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: math.id
    }

    {:ok, math_lecture} = Repo.insert %Section{
      days: ~W(M W R),
      schedule_type: "Lecture",
      time_start: %Time{hour: 16, min: 30, sec: 0},
      time_end: %Time{hour: 17, min: 20, sec: 0},
      course_id: math.id
    }

    {:ok, math_lab} = Repo.insert %Section{
      days: ~W(F),
      schedule_type: "Lab",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: math.id
    }

    { :ok,
      course_ids: [math.id, csc.id],
      math_lecture: math_lecture,
      math_lecture_conflict: math_lecture_conflict,
      csc_lecture: csc_lecture,
      csc_tutorial: csc_tutorial
    }
  end

  test "[build/1]", %{course_ids: course_ids, math_lecture: math_lecture} do
    sections = Schedule.build(course_ids)
    assert Enum.count(sections) == 4
    assert Enum.find(sections, & &1.id == math_lecture.id)
  end

  test "[no_conflict/1]", context do
    assert Schedule.no_conflict(
      [context.csc_tutorial, context.csc_lecture]) == 0

    assert Schedule.no_conflict(
      [context.math_lecture, context.csc_lecture]) == 0

    assert Schedule.no_conflict(
      [context.math_lecture_conflict, context.csc_lecture]) == 1
  end
end
