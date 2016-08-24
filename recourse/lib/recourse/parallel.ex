defmodule Recourse.Parallel do
  @spec map(Enum.t, (any -> any)) :: [any]
  def map(collection, fun) do
    this = self
    collection
    |> Enum.map(fn (item) ->
      spawn_link fn ->
        send this, { self, fun.(item) }
      end
    end)
    |> Enum.map(fn (pid) ->
      receive do { ^pid, result } -> result end
    end)
  end
end
