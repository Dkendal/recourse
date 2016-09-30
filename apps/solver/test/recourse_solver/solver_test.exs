defmodule RecourseSolver.SolverTest do
  alias RecourseSolver.Solver
  alias Recourse.{
    Repo,
    Course,
    Section,
    MeetingTime,
    Term,
  }
  use RecourseSolver.Case, async: true
  import Ecto.Query

  def start_solver(context) do
    Solver.start
    context
  end

  def stop_solver(context) do
    on_exit fn ->
      Solver.stop
    end
    context
  end

  describe ".solve" do
    setup [:start_solver, :stop_solver]

    test "expected response" do
      Repo.insert! %Term{
        semester: :fall,
        year: 2020,
        courses: [
          %Course{
            subject: "MATH",
            number: "100",
            sections: [
              %Section{
                name: "A01",
                schedule_type: "lecture",
                meeting_times: [
                  %MeetingTime{
                    days: ~W(M W F),
                    start_time: ~t[08:00:00],
                    end_time: ~t[09:20:00],
                  },
                ]
              }
            ]
          },
        ]
      }

      sections = Repo.all(preload(Section, [:course, :meeting_times]))
      [section] = sections

      assert Solver.solve(sections) ==
        [%{
          "course_id" => section.course_id,
          "id" => "None",
          "ids" => [section.id],
          "schedule_type" => "lecture"
        }]
    end
  end

  describe ".ping" do
    setup [:start_solver, :stop_solver]

    test "expected response" do
      assert Solver.ping() == "pong"
    end
  end

  describe ".stop" do
    setup [:start_solver]

    test "stops the server" do
      assert Solver.stop() == :ok
    end
  end
end
