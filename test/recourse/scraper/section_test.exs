defmodule Recourse.Scraper.SectionTest do
  use Recourse.Case, async: false

  describe "#all/1" do
    context "the course doesn't exist" do
      it "returns an empty array" do
        use_cassette "art 112" do
          assert [] == create(:course, subject: "ART", number: "112")
                      |> Recourse.Scraper.Section.all
        end
      end
    end

    context "when there are multiple meeting times for a section" do
      it "creates multiple sections" do
        use_cassette "art 103 sections" do
          winter_2016 = create(:term, semester: :winter, year: 2016)
          art = create(:course, subject: "ART", number: "103", term: winter_2016)
          art_id = art.id

          inserted_section =
          art
          |> Recourse.Scraper.Section.all
          |> hd
          |> Recourse.Repo.insert!
          |> Recourse.Repo.preload([:meeting_times, :course])

          assert length(inserted_section.meeting_times) == 2
        end
      end
    end

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
          course_id: ^csc_id,
          meeting_times: [
            %Recourse.MeetingTime{
              start_time: %Ecto.Time{hour: 10, min: 0},
              end_time: %Ecto.Time{hour: 11, min: 20},
              date_start: %Ecto.Date{year: 2015, month: 1, day: 5},
              date_end: %Ecto.Date{year: 2015, month: 4, day: 2},
              location: "MacLaurin Building A144"
            }
          ],
          credits: 1.5,
          instructional_method: "Face to Face",
          name: "A01",
          crn: "20665",
          registration_end: %Ecto.Date{year: 2015, month: 1, day: 21},
          registration_start: %Ecto.Date{year: 2014, month: 6, day: 16},
        } = inserted_section)
      end
    end
  end

  test "transforming a section" do
    input = %{
      "Date Range" => "Jan 05, 2015 - Apr 02, 2015",
      "Days" => "MR",
      "Instructors" => "Celina Gay  Berg (P)",
      "Time" => "10:00 am - 11:20 am",
      "Type" => "Every Week",
      "Where" => "MacLaurin Building A144"}

    actual =
      Recourse.Scraper.Section.Response.transform(input)

    assert_attributes actual,
      start_time: %Ecto.Time{hour: 10, min: 0, sec: 0},
      end_time: %Ecto.Time{hour: 11, min: 20, sec: 0},
      days: ~W(M R),
      location: "MacLaurin Building A144",
      date_start: %Ecto.Date{year: 2015, month: 1, day: 5},
      date_end: %Ecto.Date{year: 2015, month: 4, day: 2}
  end
end
