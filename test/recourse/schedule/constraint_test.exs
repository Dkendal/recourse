defmodule Recourse.ScheduleTest do
  use ExUnit.Case
  alias Recourse.Repo
  alias Recourse.Term
  alias Recourse.Course
  alias Recourse.Section
  alias Recourse.Schedule.Constraint
  alias Ecto.Time
  import Repo, only: [insert: 1]

  setup do
    {:ok, term} = insert %Term{year: 2015, semester: :summer}

    {:ok, csc} = insert %Course{
      subject: "CSC", number: "100", term_id: term.id
    }

    {:ok, math} = insert %Course{
      subject: "MATH", number: "100", term_id: term.id
    }

    {:ok, csc_lecture} = insert %Section{
      days: ~W(M W R),
      schedule_type: "Lecture",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: csc.id
    }

    {:ok, csc_tutorial} = insert %Section{
      days: ~W(T),
      schedule_type: "Tutorial",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: csc.id
    }

    {:ok, earlier_math_lecture} = insert %Section{
      days: ~W(M W R),
      schedule_type: "Lecture",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: math.id
    }

    { :ok,
      earlier_math_lecture: earlier_math_lecture,
      csc_lecture: csc_lecture,
      csc_tutorial: csc_tutorial
    }
  end

  test "[no_conflict/1]", context do
    assert Constraint.no_conflict(
      [context.csc_tutorial, context.csc_lecture]) == 0

    assert Constraint.no_conflict(
      [context.earlier_math_lecture, context.csc_lecture]) == 1000
  end
end
