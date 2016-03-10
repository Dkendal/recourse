defmodule Recourse.MeetingTimeView do
  use JSONAPI.PhoenixView

  def fields(), do: [
    :date_end,
    :date_start,
    :days,
    :instructors,
    :location,
    :end_time,
    :start_time,
    :type,
  ]

  def type(), do: "meeting_time"
  def relationships(), do: [
    section: Recourse.SectionView,
    overlap: Recourse.OverlapView,
  ]
end
