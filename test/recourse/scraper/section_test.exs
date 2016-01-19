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

  test "fetching sections for a course", context do
    use_cassette "csc 110 sections" do
      %{course: course} = context

      actual = hd Recourse.Scraper.Section.all(%{
        term: course.term,
        course: course
      })

      assert_valid actual

      assert_attributes actual.changes,
        campus: "Main",
        name: "A01",
        course_id: course.id
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
      Recourse.Scraper.Section.transform(input)

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
