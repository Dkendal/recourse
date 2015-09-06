defmodule Recourse.SectionView do
  use Recourse.Web, :view

  def render("index.json", %{sections: sections}) do
    %{data: render_many(sections, Recourse.SectionView, "section.json")}
  end

  def render("show.json", %{section: section}) do
    %{data: render_one(section, Recourse.SectionView, "section.json")}
  end

  def render("section.json", %{section: section}) do
    %{id: section.id,
      registration_code: section.registration_code,
      schedule_type: section.schedule_type,
      time_start: section.time_start,
      time_end: section.time_end,
      days: section.days,
      location: section.location,
      date_start: section.date_start,
      date_end: section.date_end,
      registration_start: section.registration_start,
      registration_end: section.registration_end,
      campus: section.campus,
      credits: section.credits,
      instructional_method: section.instructional_method,
      course_id: section.course_id,
      term_id: section.term_id}
  end
end
