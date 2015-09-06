defmodule Recourse.CourseView do
  use Recourse.Web, :view

  def render("index.json", %{courses: courses}) do
    %{data: render_many(courses, Recourse.CourseView, "course.json")}
  end

  def render("show.json", %{course: course}) do
    %{data: render_one(course, Recourse.CourseView, "course.json")}
  end

  def render("course.json", %{course: course}) do
    %{id: course.id,
      title: course.title,
      subject: course.subject,
      number: course.number,
      description: course.description,
      requirement: course.requirement}
  end
end
