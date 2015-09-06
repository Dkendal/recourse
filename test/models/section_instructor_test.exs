defmodule Recourse.SectionInstructorTest do
  use Recourse.ModelCase

  alias Recourse.SectionInstructor
  alias Recourse.Section
  alias Recourse.Instructor

  @invalid_attrs %{}

  test "changeset with valid attributes" do
    section = Repo.insert! %Section{}
    instructor = Repo.insert! %Instructor{}

    valid_attrs = %{section_id: section.id, instructor_id: instructor.id}

    changeset = SectionInstructor.changeset(%SectionInstructor{}, valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = SectionInstructor.changeset(%SectionInstructor{}, @invalid_attrs)
    refute changeset.valid?
  end
end
