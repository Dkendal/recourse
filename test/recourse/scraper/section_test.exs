defmodule Recourse.Scraper.SectionTest do
  use Recourse.Case, async: false

  describe "#all/1" do
    it "returns all sections for the given course" do
      use_cassette "csc 110 sections" do
        csc = create(:course, subject: "CSC", number: "110")
        csc_id = csc.id

        inserted_section =
          csc
          |> Recourse.Scraper.Section.all
          |> hd
          |> Recourse.Repo.insert!
          |> Recourse.Repo.preload([:meeting_times, :course])

        assert(%Recourse.Section{
          campus: "Main",
          course: csc,
          meeting_times: [],
          credits: 1.5,
          date_end: %Ecto.Date{year: 2015, month: 4, day: 2},
          date_start: %Ecto.Date{year: 2015, month: 1, day: 5},
          instructional_method: "Face to Face",
          location: "MacLaurin Building A144",
          name: "A01",
          registration_code: "20665",
          registration_end: %Ecto.Date{year: 2015, month: 1, day: 21},
          registration_start: %Ecto.Date{year: 2014, month: 6, day: 16},
          schedule_type: "Lecture",
        } = inserted_section)
      end
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
  end
end
