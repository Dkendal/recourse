defmodule Solver.Solution do
  defstruct [:course_id, :schedule_type, :id, :ids]

  def parse(sol) when is_map(sol) do
    attrs = sol
            |> Enum.map(&parse/1)
            |> Enum.into(%{})

    struct(__MODULE__, attrs)
  end

  def parse(list) when is_list(list) do
    parse(list, [])
  end

  def parse({k, v}) do
    {parse_key(k), parse_value(v)}
  end

  def parse([], acc) do
    acc
  end

  def parse([h|t], acc) do
    x = parse(h)
    parse(t, [x|acc])
  end

  defp parse_key(k) do
    String.to_existing_atom(k)
  end

  defp parse_value("None") do
    :unbound
  end

  defp parse_value(v) do
    v
  end
end
