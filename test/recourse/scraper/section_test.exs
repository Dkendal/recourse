defmodule Recourse.Scraper.SectionTest do
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

  test "fetching sections for a course", %{term: term} do
    actual =
      Recourse.Scraper.Section.all([term, "CSC", "110"])

    # can insert records
    {:ok, _section} = Repo.insert List.first actual

    # is a non empty list
    assert is_list(actual)
    assert length(actual) > 0
    # containing sections
    assert Enum.all?(actual, &is_section?/1)
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
      time_start: %Ecto.Time{hour: 11, min: 20, sec: 0},
      time_end: %Ecto.Time{hour: 10, min: 0, sec: 0},
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

  defp is_section?(%Recourse.Section{}), do: true
  defp is_section?(_), do: false
end
