defmodule Recourse.TimetableView do
  use JSONAPI.PhoenixView

  def fields(), do: []
  def type(), do: "timetable"
  def relationships(), do: [
    overlaps: {Recourse.OverlapView, :include},
    sections: Recourse.SectionView,
    meeting_times: Recourse.MeetingTimeView,
  ]
end
