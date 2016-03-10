defmodule Recourse.Timetable do
  defstruct [:id, :sections, :overlaps, :meeting_times]

  def id do
    :rand.uniform(1000000000)
    |> :httpd_util.integer_to_hexlist
  end

  def new(sections) do
    alias __MODULE__.Overlap

    overlaps =  for section <- sections, do: Overlap.new([section])
    sections = Enum.flat_map(overlaps, & &1.sections)
    meeting_times = Enum.flat_map(sections, & &1.meeting_times)

    %__MODULE__{
      id: id,
      sections: sections,
      overlaps: overlaps,
      meeting_times: meeting_times,
    }
  end

  defmodule Overlap do
    defstruct [:sections, :id, :size]

    def new(sections) do
      overlap = %__MODULE__{
        id: Recourse.Timetable.id,
        size: sections |> length,
      }

      set_inverse = & %{ &1 | overlap: overlap }

      sections = for section <- sections do
        meeting_times = Enum.map(section.meeting_times, set_inverse)

        %{section | meeting_times: meeting_times}
        |> set_inverse.()
      end

      %{overlap | sections: sections}
    end
  end
end
