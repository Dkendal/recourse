defmodule Recourse.ScraperTest do
  use ExUnit.Case
  alias Recourse.Term
  import Ecto.Query

  setup do
    Recourse.Scraper.start
    :ok
  end

  test "fetching a list of courses" do
    actual =
      Recourse.Scraper.courses([2015, :spring, ["CSC"], "100", "200"])

    assert is_list(actual)
    assert length(actual) > 0
    assert Enum.all?(actual, &is_course?/1)
  end

  @tag timeout: :infinity
  test "fetching sections for a course" do
    actual =
      Recourse.Scraper.course([2015, :spring, "CSC", "110"])

    assert is_list(actual)
    assert length(actual) > 0
    assert Enum.all?(actual, &is_section?/1)
  end

  test "parsing a course" do
    expected = %Recourse.Course{
      subject: "CSC",
      number: "100",
      title: "ELEMENTARY COMPUTING" }

    actual =
      Recourse.Scraper.parse("CSC 100 - ELEMENTARY COMPUTING", :course)

    assert expected == actual
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
