defmodule Recourse.MeetingTimeTest do
  use Recourse.ModelCase

  alias Recourse.MeetingTime

  @valid_attrs %{
    date_end: "2015-04-01",
    date_start: "2015-01-01",
    days: ["M"],
    instructors: ["jane doe"],
    location: "some place",
    section_id: 1,
    time_end: "12:00:00",
    time_start: "10:00:00",
    type: "Every Week"
  }

  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = MeetingTime.changeset(%MeetingTime{}, @valid_attrs)
    assert changeset.valid?, inspect(changeset.errors)
  end

  test "changeset with invalid attributes" do
    changeset = MeetingTime.changeset(%MeetingTime{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "can be encoded to json" do
    Poison.encode %MeetingTime{}
  end
end
