defmodule Recourse.Digraph do
  defmacrop raise_erl expr do
    quote do
      case unquote(expr) do
        {:error, m} ->
          raise m
        v ->
          v
      end
    end
  end

  def add_vertex g do
    fn v ->
      raise_erl(:digraph.add_vertex g, v)
    end
  end

  def add_edge g, x, y do
    raise_erl(:digraph.add_edge g, x, y)
  end
end
