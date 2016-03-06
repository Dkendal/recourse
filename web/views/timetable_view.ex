defmodule Recourse.SectionView do
  use JSONAPI.PhoenixView

  def fields(), do: [
    :crn,
    :name,
    :schedule_type,
    :seats,
    :waitlist,
  ]

  def type(), do: "section"
  def relationships(), do: [
  ]
end

defmodule Recourse.TimetableView do
  use JSONAPI.PhoenixView

  def fields(), do: []
  def type(), do: "timetable"
  def relationships(), do: [
    sections: {Recourse.SectionView, :include},
  ]
end
