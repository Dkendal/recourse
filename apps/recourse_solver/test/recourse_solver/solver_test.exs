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
      term = Repo.insert %Term{
        semester: :fall,
        year: 2020,
        courses: [
          %Course{
            subject: "MATH",
            number: "100",
            sections: [
              %Section{
                name: "A1",
                meeting_times: [
                  %MeetingTime{
                    location: "",
                    type: "lecture",
                    days: ["M", "W"],
                    start_time: ~t[12:00:00],
                    end_time: ~t[14:20:00],
                  }
                ]
              }
            ]
          }
        ]
      }

      IO.inspect Repo.all(preload(Course, [sections: [:meeting_times]]))
      # IO.inspect Solver.solve([])
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
