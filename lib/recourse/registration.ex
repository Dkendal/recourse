defmodule Recourse.Registration do
  alias Recourse.Parallel
  alias Recourse.Scraper.Seats
  alias Recourse.Section

  @type key :: {String.t, String.t}

  # @spec load([Section.t]) :: [Section.t]

  @waitlist_dummy %{
    capacity: 100,
    actual: 0,
    remaining: 0
  }

  @seats_dummy %{
    capacity: 100,
    actual: 50,
    remaining: 50
  }

  def load(sections), do: load(sections, Mix.env)

  def load(sections, :dev) do
    Parallel.map sections, fn x ->
      x
      |> Map.put(:seats, @seats_dummy)
      |> Map.put(:waitlist, @waitlist_dummy)
    end
  end

  def load(sections, _) do
    sections
    |> Parallel.map(&hit/1)
  end

  @spec key(Section.t) :: key
  def key(section) do
    {section.crn, to_string(section.course.term)}
  end

  @spec hit(Section.t) :: Section.t
  def hit(section) do
    seats = ConCache.get_or_store :seats, key(section), fn ->
      Seats.find(section)
    end
    Map.merge section, seats
  end
end
