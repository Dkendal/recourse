defmodule Recourse.Registration do
  alias Recourse.Parallel
  alias Recourse.Scraper.Seats
  alias Recourse.Section

  @type key :: {String.t, String.t}

  def load(sections) do
    sections
    |> Parallel.map(&hit/1)
  end

  def dummy(sections) do
    sections |> Enum.map(fn section ->
      dummy = %{
        actual: 0,
        capacity: 999,
        remaining: 999,
      }
      %Section{ section | waitlist: dummy, seats: dummy }
    end)
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
