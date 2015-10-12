defmodule Recourse.Scraper.CourseTest do
  use ExUnit.Case
  alias Recourse.Term
  alias Recourse.Repo
  alias Recourse.Course
  alias Recourse.Section

  setup do
    {:ok, term} = Repo.insert(%Term{
      year: 2015,
      semester: :winter
    })

    Recourse.Scraper.start
    { :ok,
      term: term
    }
  end

  test "fetching a list of courses", %{term: term} do
    actual =
      Recourse.Scraper.Course.all(%{
        term: term,
        subjects: ~w(CSC),
        number_start: "100",
        number_end: "200"
      })

    # make sure the record is valid
    {:ok, course} = Recourse.Repo.insert List.first actual

    # is a non empty list
    assert is_list(actual)
    assert length(actual) > 0

    # containing courses
    assert Enum.all?(actual, &is_course?/1)

    # that all have an association with the term
    assert Enum.all?(actual, & &1.term_id == term.id)
  end

  test "parsing a course" do
    expected = %Recourse.Course{
      subject: "CSC",
      number: "100",
      title: "ELEMENTARY COMPUTING" }

    actual =
      Recourse.Scraper.Course.parse("CSC 100 - ELEMENTARY COMPUTING")

    assert expected == actual
  end

  defp is_course?(%Recourse.Course{}), do: true
  defp is_course?(_), do: false
end
