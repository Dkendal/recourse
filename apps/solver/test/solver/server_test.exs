defmodule Solver.ServerTest do
  alias Solver.Server

  alias Recourse.{
    Repo,
    Course,
    Section,
    MeetingTime,
    Term,
  }

  use Solver.Case, async: true

  import Ecto.Query

  def start_solver(context) do
    Server.start
    context
  end

  def stop_solver(context) do
    on_exit fn ->
      Server.stop
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
                    date_start: ~D[2020-09-05],
                    date_end: ~D[2021-04-25],
                    start_time: ~T[08:00:00],
                    end_time: ~T[09:20:00],
                  },
                ]
              }
            ]
          },
        ]
      }

      sections = Repo.all(preload(Section, [:course, :meeting_times]))

      [section] = sections

      assert Server.solve(sections) ==
        [%Solver.Solution{
          course_id: section.course_id,
          schedule_type: "lecture",
          id: :unbound,
          ids: [section.id],
        }]
    end
  end

  describe ".ping" do
    setup [:start_solver, :stop_solver]

    test "expected response" do
      assert Server.ping() == "pong"
    end
  end

  describe ".stop" do
    setup [:start_solver]

    test "stops the server" do
      assert Server.stop() == :ok
    end
  end
end
