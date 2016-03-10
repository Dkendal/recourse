defmodule Recourse.OverlapView do
  use JSONAPI.PhoenixView

  def fields(), do: [:size]
  def type(), do: "overlap"
  def relationships(), do: [
    meeting_times: {Recourse.MeetingTimeView, :include}
  ]
end
