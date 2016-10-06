defmodule Recourse.CourseTest do
  use Recourse.ModelCase

  alias Recourse.{Course, Term}

  @valid_attrs %{
    description: "some content",
    number: "some content",
    requirement: "some content",
    subject: "some content",
    title: "some content",
    term_id: 1}

  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Course.changeset(%Course{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Course.changeset(%Course{}, @invalid_attrs)
    refute changeset.valid?
  end

  describe ".search" do
    test "returns similar courses to the query" do
      Repo.insert %Term{
        semester: :summer,
        year: 2020,
        courses: [
          %Course{
            subject: "MATH",
            number: "400",
            title: "hard math course"
          },
          %Course{
            subject: "CSC",
            number: "100",
            title: "intro comp sci"
          },
        ]
      }

      courses = Repo.all Course.search(Course, "csc")
      [%Course{subject: "CSC"}, %Course{subject: "MATH"}] = courses
    end
  end
end
