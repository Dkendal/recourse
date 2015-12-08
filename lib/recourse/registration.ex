defmodule Recourse.Registration do
  alias Recourse.Section
  alias Recourse.Scraper.Seats

  @type t :: {Section.t, Seats.t}

  @spec load([Section.t], [t]) :: [t]
  def load(_sections, _accumulator \\ [])
  def load([], s), do: s
  def load([h|t], s) do
    val = {h, Seats.find(h)}
    load(t, [val | s])
  end
end
