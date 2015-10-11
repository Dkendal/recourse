defmodule Recourse.CourseTest do
  use Recourse.ModelCase

  alias Recourse.Course

  @valid_attrs %{description: "some content", number: "some content", requirement: "some content", subject: "some content", title: "some content", term_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Course.changeset(%Course{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Course.changeset(%Course{}, @invalid_attrs)
    refute changeset.valid?
  end
end
