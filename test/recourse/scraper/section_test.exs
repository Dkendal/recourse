defmodule Recourse.Scraper.SectionTest do
  use ExUnit.Case
  use Recourse.Assertions

  alias Recourse.Course
  alias Recourse.Repo
  alias Recourse.Term

  setup do
    {:ok, term} = Repo.insert(%Term{
      year: 2015,
      semester: :winter
    })

    {:ok, course} = Repo.insert(%Course{
      term_id: term.id,
      subject: "CSC",
      number: "110"
    })

    Recourse.Scraper.start
    { :ok,
      term: term,
      course: course
    }
  end

  test "fetching sections for a course", context do
    %{term: term, course: course} =
      context

    actual =
      Recourse.Scraper.Section.all(%{
        term: term,
        course: course
      })

    changeset = List.first actual
    assert_valid changeset
  end

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
      Recourse.Scraper.Section.transform(input)

    expected = %{
      # registration_code:
      schedule_type: "Lecture",
      time_start: %Ecto.Time{hour: 10, min: 0, sec: 0},
      time_end: %Ecto.Time{hour: 11, min: 20, sec: 0},
      days: ~W(M R),
      location: "MacLaurin Building A144",
      date_start: %Ecto.Date{year: 2015, month: 1, day: 5},
      date_end: %Ecto.Date{year: 2015, month: 4, day: 2},
      # registration_start:
      # registration_end:
      # campus:
      # credits:
      # instructional_method:
    }

    assert_attributes(actual, expected)
  end
end
