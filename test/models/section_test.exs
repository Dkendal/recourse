defmodule Recourse.SectionTest do
  use Recourse.ModelCase
  use Recourse.Assertions

  alias Recourse.Section

  @valid_attrs %{
    campus: "some content",
    credits: "120.5",
    date_end: "2015-12-12",
    date_start: "2015-12-12",
    days: [],
    instructional_method: "some content",
    location: "some content",
    registration_code: "some content",
    registration_end: "2015-12-12",
    registration_start: "2015-12-12",
    schedule_type: "some content",
    time_end: "14:00:00",
    time_start: "14:00:00"}

  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Section.changeset(%Section{}, @valid_attrs)
    assert_valid changeset
  end

  test "changeset with invalid attributes" do
    changeset = Section.changeset(%Section{}, @invalid_attrs)
    refute changeset.valid?
  end
end
