defmodule Recourse.TimetableView do
  use JSONAPI.PhoenixView

  def fields(), do: []
  def type(), do: "timetable"
  def relationships(), do: [
    sections: {Recourse.SectionView, :include},
  ]
end
