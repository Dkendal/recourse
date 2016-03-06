defmodule Recourse.Timetable do
  defstruct [:id, :sections, :overlaps]

  def new(sections) do
    alias __MODULE__.Overlap

    overlaps =  for section <- sections, do: struct(Overlap, sections: [section])

    struct(__MODULE__,
      id: :rand.uniform(999_999_999),
      sections: sections,
      overlaps: overlaps,
    )
  end

  defmodule Overlap do
    defstruct [:sections]
  end
end
