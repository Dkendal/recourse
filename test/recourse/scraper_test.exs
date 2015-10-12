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

  test "fetching sections for a course", %{term: term} do
    actual =
      Recourse.Scraper.sections([term, "CSC", "110"])

    # can insert records
    {:ok, section} = Recourse.Repo.insert List.first actual

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
