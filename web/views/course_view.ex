defmodule Recourse.CourseView do
  use JSONAPI.PhoenixView

  def fields(), do: [
    :title,
    :subject,
    :number,
  ]

  def type(), do: "course"
  def relationships(), do: [
    sections: Recourse.SectionView
  ]
end
