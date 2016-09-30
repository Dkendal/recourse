defmodule Solver.Case do
  use ExUnit.CaseTemplate

  using do
    quote do
      use Recourse.Sigils
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Recourse.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Recourse.Repo, {:shared, self()})
    end

    :ok
  end
end
