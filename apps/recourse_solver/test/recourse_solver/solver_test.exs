defmodule RecourseSolver.SolverTest do
  use ExUnit.Case, async: true
  alias RecourseSolver.Solver

  setup do
    Solver.start

    on_exit fn ->
      Solver.stop :normal
    end

    :ok
  end

  test ".ping" do
    assert Solver.ping == "pong"
  end
end
