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
    meeting_times: {Recourse.MeetingTimeView, :include},
    course: {Recourse.CourseView, :include},
    overlap: Recourse.OverlapView,
  ]
end

