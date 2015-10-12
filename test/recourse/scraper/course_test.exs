defmodule Recourse.Scraper.CourseTest do
  use ExUnit.Case
  use Recourse.Assertions
  alias Recourse.Term
  alias Recourse.Repo

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

    changeset = List.first actual
    assert_valid changeset
    assert changeset.model == %Recourse.Course{}
    assert changeset.changes.term_id == term.id
  end

  test "parsing a course" do
    expected = %{
      subject: "CSC",
      number: "100",
      title: "ELEMENTARY COMPUTING",
      term_id: nil
    }

    actual =
      Recourse.Scraper.Course.parse("CSC 100 - ELEMENTARY COMPUTING")

    assert expected == actual
  end
end
