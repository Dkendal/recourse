defmodule Recourse.Scraper.Seats do
  alias Recourse.Section
  import Recourse.Scraper
  import Floki, only: [find: 2]

  @type seats :: %{
    capacity: integer,
    actual: integer,
    remaining: integer
  }

  @type registration_availability :: %{
    seats: seats,
    waitlist: seats
  }

  @spec find(Section.t) :: registration_availability
  def find(section) do
    to_query(section)
    |> URI.encode_query
    |> http_get
    |> parse
  end

  defp parse(%{body: body}) do
    [waitlist, seats] =
      body
      |> find(".ddlabel[scope=row] ~ td")
      |> get_seats

    %{seats: seats, waitlist: waitlist}
  end

  defp get_seats(_row, _accumulator \\ [])
  defp get_seats([], s), do: s
  defp get_seats([{_, _, [c]}, {_, _, [a]}, {_, _, [r]} |t], s) do
    [c, a, r] = Enum.map [c, a, r], &Integer.parse(&1) |> elem(0)
    seats = %{
      capacity: c,
      actual: a,
      remaining: r
    }
    get_seats(t, [seats | s])
  end

  defp http_get(query) do
    get!("seats?" <> query)
  end

  @type query :: %{term_in: String.t, crn_in: String.t}
  @spec to_query(Section.t) :: query
  defp to_query(section) do
    %{
      term_in: to_string(section.course.term),
      crn_in: section.registration_code
    }
  end
end
