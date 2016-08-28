defmodule RecourseSolver.SolverTest do
  use ExUnit.Case, async: true
  alias RecourseSolver.Solver

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
