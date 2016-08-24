defmodule Recourse.TimetableView do
  use JSONAPI.PhoenixView

  def fields(), do: []
  def type(), do: "timetable"
  def relationships(), do: [
    meeting_times: Recourse.MeetingTimeView,
    overlaps: {Recourse.OverlapView, :include},
    sections: {Recourse.SectionView, :include},
  ]
end
