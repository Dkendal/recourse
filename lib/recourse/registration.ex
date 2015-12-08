defmodule Recourse.Registration do
  alias Recourse.Parallel
  alias Recourse.Scraper.Seats
  alias Recourse.Section

  @type t :: {Section.t, Seats.t}
  @type key :: {String.t, String.t}

  @spec load([Section.t]) :: [t]
  def load(sections) do
    sections
    |> Parallel.map &hit/1
  end

  @spec key(Section.t) :: key
  def key(section) do
    {section.registration_code, to_string(section.course.term)}
  end

  @spec hit(Section.t) :: t
  def hit(section) do
    seats = ConCache.get_or_store :seats, key(section), fn ->
      Seats.find(section)
    end
    {section, seats}
  end
end
