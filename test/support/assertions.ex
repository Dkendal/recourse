defmodule Recourse.Assertions do
  defmacro __using__(_opts) do
    quote do
      require unquote(__MODULE__)
      import unquote(__MODULE__)
    end
  end

  def assert_attributes actual, expected do
    Enum.map expected, fn {k, v} ->
      {:ok, actual} = Map.fetch(actual, k)
      actual == v
    end
  end
end
