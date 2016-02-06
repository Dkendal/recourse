defmodule Recourse.Scraper.SectionTest do
  use Recourse.Case, async: false

  setup do
    course = create(:course, subject: "CSC", number: "110")

    {
      :ok,
      course: course,
      timeout: :infinity
    }
  end

  describe "#all/1" do
    # it "returns all sections for the given course" do
    #   winter_2015 = create(:term, year: 2015, semester: :winter)

    #   math_100 = create(:course, subjct: "MATH", number: "100", term: winter_2015)
    #   actual = Recourse.Scraper.Section.all(%{course: math_100, term: winter_2015})
    #   IO.inspect actual
    # end
  end

  test "fetching sections for a course", context do
    use_cassette "csc 110 sections" do
      %{course: course} = context

      all = Recourse.Scraper.Section.all(course)
      actual = hd all

      assert_valid actual

      assert_attributes actual.changes,
        campus: "Main",
        name: "A01",
        course_id: course.id

      Recourse.Repo.insert actual
    end
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
      Recourse.Scraper.Section.Response.transform(input)

    assert_attributes actual,
      schedule_type: "Lecture",
      time_start: %Ecto.Time{hour: 10, min: 0, sec: 0},
      time_end: %Ecto.Time{hour: 11, min: 20, sec: 0},
      days: ~W(M R),
      location: "MacLaurin Building A144",
      date_start: %Ecto.Date{year: 2015, month: 1, day: 5},
      date_end: %Ecto.Date{year: 2015, month: 4, day: 2}
      # registration_code:
      # registration_start:
      # registration_end:
      # campus:
      # credits:
      # instructional_method:
  end
end
