defmodule Recourse.SectionTest do
  use Recourse.ModelCase

  alias Recourse.Section

  @valid_attrs %{campus: "some content", credits: "120.5", date_end: "some content", date_start: "some content", days: [], instructional_method: "some content", location: "some content", registration_code: "some content", registration_end: "some content", registration_start: "some content", schedule_type: "some content", time_end: "14:00:00", time_start: "14:00:00"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Section.changeset(%Section{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Section.changeset(%Section{}, @invalid_attrs)
    refute changeset.valid?
  end
end
