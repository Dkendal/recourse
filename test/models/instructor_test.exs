defmodule Recourse.InstructorTest do
  use Recourse.ModelCase

  alias Recourse.Instructor

  @valid_attrs %{firstname: "some content", lastname: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Instructor.changeset(%Instructor{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Instructor.changeset(%Instructor{}, @invalid_attrs)
    refute changeset.valid?
  end
end
