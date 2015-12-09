defmodule Recourse.Scraper.Seats do
  alias Recourse.Section
  import Recourse.Scraper
  import Floki, only: [find: 2]

  @type seats :: %{
    capacity: integer,
    actual: integer,
    remaining: integer
  } | :error

  @type t :: %{
    seats: seats,
    waitlist: seats
  }

  @spec find(Section.t) :: t
  def find(section) do
    to_query(section)
    |> URI.encode_query
    |> http_get
    |> parse
    |> format_output
  end

  defp parse(%{body: body}) do
    body
    |> find(".ddlabel[scope=row] ~ td")
    |> get_seats
  end

  defp format_output([waitlist, seats]) do
    %{seats: seats, waitlist: waitlist}
  end

  defp format_output([]) do
    %{
      seats: :error,
      waitlist: :error
    }
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
