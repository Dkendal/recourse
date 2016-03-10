defmodule Recourse.Timetable do
  alias Recourse.MeetingTime
  defstruct [:id, :sections, :overlaps, :meeting_times]

  @doc "Creates a unique 10 digit hexcode"
  def id do
    :math.pow(16, 10)
    |> round
    |> :rand.uniform
    |> :httpd_util.integer_to_hexlist
  end

  def new(sections) do
    alias __MODULE__.Overlap
    overlaps = sections
                |> Enum.flat_map(& &1.meeting_times)
                |> Enum.flat_map(&expand_days/1)
                |> components
                |> Enum.map(&Overlap.new/1)

    meeting_times = overlaps
                    |> Enum.flat_map(& &1.meeting_times)

    %__MODULE__{
      id: id,
      sections: sections,
      overlaps: overlaps,
      meeting_times: meeting_times,
    }
  end

  # TODO convert this into it's own struct
  def expand_days(%MeetingTime{} = mt) do
    Enum.map mt.days, fn day ->
      %{ mt | day: day, days: [day], id: "#{mt.id}-#{day}" }
    end
  end

  def components(meeting_times) do
    g = :digraph.new

    for mt <- meeting_times, do: :digraph.add_vertex(g, mt)

    for x <- meeting_times, y <- meeting_times, x > y,
      do: if Recourse.MeetingTime.overlapping?(x, y),
        do: :digraph.add_edge(g, x, y)

    :digraph_utils.components g
  end

  defmodule Overlap do
    defstruct [:meeting_times, :id, :size]

    def new(meeting_times) do
      overlap = %__MODULE__{
        id: Recourse.Timetable.id,
        size: length(meeting_times),
      }

      meeting_times = for mt <- meeting_times,
        do: %MeetingTime{ mt | overlap: overlap }

      %Overlap{overlap | meeting_times: meeting_times}
    end
  end
end
