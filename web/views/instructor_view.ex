defmodule Recourse.InstructorView do
  use Recourse.Web, :view

  def render("index.json", %{instructors: instructors}) do
    %{data: render_many(instructors, Recourse.InstructorView, "instructor.json")}
  end

  def render("show.json", %{instructor: instructor}) do
    %{data: render_one(instructor, Recourse.InstructorView, "instructor.json")}
  end

  def render("instructor.json", %{instructor: instructor}) do
    %{id: instructor.id,
      firstname: instructor.firstname,
      lastname: instructor.lastname}
  end
end
