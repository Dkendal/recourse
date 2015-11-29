defmodule Recourse.ScheduleTest do
  use ExUnit.Case
  alias Recourse.Repo
  alias Recourse.Term
  alias Recourse.Course
  alias Recourse.Section
  alias Recourse.Schedule
  alias Ecto.Time
  import Enum, only: [any?: 2, find: 2, count: 1, member?: 2]
  import Repo, only: [insert: 1]

  setup do
    {:ok, term} = insert %Term{year: 2015, semester: :summer}

    {:ok, csc} = insert %Course{
      subject: "CSC", number: "100", term_id: term.id
    }

    {:ok, engl} = insert %Course{
      subject: "ENGL", number: "100", term_id: term.id
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

    {:ok, engl_lecture} = insert %Section{
      days: ~W(M W R),
      schedule_type: "Lecture",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: engl.id
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

    {:ok, late_math_lecture} = insert %Section{
      days: ~W(M W R),
      schedule_type: "Lecture",
      time_start: %Time{hour: 19, min: 30, sec: 0},
      time_end: %Time{hour: 20, min: 20, sec: 0},
      course_id: math.id
    }

    {:ok, math_lab} = insert %Section{
      days: ~W(F),
      schedule_type: "Lab",
      time_end: %Time{hour: 16, min: 20, sec: 0},
      time_start: %Time{hour: 15, min: 30, sec: 0},
      course_id: math.id
    }

    { :ok,
      math: math,
      csc: csc,
      engl: engl,
      course_ids: [math.id, csc.id],
      late_math_lecture: late_math_lecture,
      earlier_math_lecture: earlier_math_lecture,
      engl_lecture: engl_lecture,
      csc_lecture: csc_lecture,
      csc_tutorial: csc_tutorial
    }
  end

  test "[build/1] groups conflicts togethor", context do
    sections = Schedule.build(%{
      "course_ids" => [context.csc.id, context.engl.id],
      "settings" => %{
        "startTime" => "00:00:00",
        "endTime" => "00:00:00"
      }
    })

    assert count(sections) == 2

    assert any? sections, fn
      [s] ->
        s.id == context.csc_tutorial.id
      _ ->
        false
    end

    assert any? sections, fn
      [x, y] ->
        (
          x.id == context.csc_lecture.id &&
          y.id == context.engl_lecture.id
        )
        or
        (
          y.id == context.csc_lecture.id &&
          x.id == context.engl_lecture.id
        )
      _ ->
        false
    end
  end

  test "[build/1]", %{course_ids: course_ids, late_math_lecture: math_lecture} do
    sections = Schedule.build(%{
      "course_ids" => course_ids,
      "settings" => %{
        "startTime" => "00:00:00",
        "endTime" => "00:00:00"
      }
    })

    assert count(sections) == 4

    assert any? sections, fn [s] ->
      s.id == math_lecture.id
    end
  end

  test "[build/1] can support time preferences", context do
    actual = Schedule.build(%{
      "course_ids" => [context.math.id],
      "settings" => %{
        "startTime" => "00:00:00",
        "endTime" => "19:00:00"
      }
    })

    assert any? actual, fn [s] ->
      s.id == context.earlier_math_lecture.id
    end

    refute any? actual, fn [s] ->
      s.id == context.late_math_lecture.id
    end

    actual = Schedule.build(%{
      "course_ids" => [context.math.id],
      "settings" => %{
        "startTime" => "19:00:00",
        "endTime" => "00:00:00"
      }
    })

    refute any? actual, fn [s] ->
      s.id == context.earlier_math_lecture.id
    end

    assert any? actual, fn [s] ->
      s.id == context.late_math_lecture.id
    end
  end

  test "[no_conflict/1]", context do
    assert Schedule.no_conflict(
      [context.csc_tutorial, context.csc_lecture]) == 0

    assert Schedule.no_conflict(
      [context.late_math_lecture, context.csc_lecture]) == 0

    assert Schedule.no_conflict(
      [context.earlier_math_lecture, context.csc_lecture]) == 1000
  end
end
