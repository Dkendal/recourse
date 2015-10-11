defmodule Recourse.ScraperTest do
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
      Recourse.Scraper.courses(%{
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

  test "fetching sections for a course", %{term: term} do
    actual =
      Recourse.Scraper.course([term, "CSC", "110"])

    # can insert records
    {:ok, section} = Recourse.Repo.insert List.first actual

    # is a non empty list
    assert is_list(actual)
    assert length(actual) > 0
    # containing sections
    assert Enum.all?(actual, &is_section?/1)
  end

  test "parsing a course" do
    expected = %Recourse.Course{
      subject: "CSC",
      number: "100",
      title: "ELEMENTARY COMPUTING" }

    actual =
      Recourse.Scraper.parse_course("CSC 100 - ELEMENTARY COMPUTING")

    assert expected == actual
  end

  @tag timeout: :infinity
  test "transforming a section" do
    input = %{
      "Date Range" => "Jan 05, 2015 - Apr 02, 2015",
      "Days" => "MR",
      "Instructors" => "Celina Gay  Berg (P)",
      "Schedule Type" => "Lecture",
      "Time" => "10:00 am - 11:20 am",
      "Type" => "Every Week",
      "Where" => "MacLaurin Building A144"}

    actual =
      Recourse.Scraper.transform_section(input)

    # expected = %Recourse.Section{
    #   registration_code:
    #   schedule_type:
    #   time_start:
    #   time_end:
    #   days:
    #   location:
    #   date_start: %Ecto.Date{year: 2015, month: 1, }
    #   date_end:
    #   registration_start:
    #   registration_end:
    #   campus:
    #   credits:
    #   instructional_method:
    # }

  end

  defp is_course?(%Recourse.Course{}), do: true
  defp is_course?(_), do: false

  defp is_section?(%Recourse.Section{}), do: true
  defp is_section?(_), do: false
end
