defmodule Recourse.Scraper.SectionTest do
  use Recourse.Case, async: false

  describe "#all/1" do
    context "with multiple courses, in one query" do
      it "loads sections for the courses" do
        use_cassette "csc 100 and 320" do
          winter_2016 = create(:term, semester: :winter, year: 2016)
          csc_320 = create(:course, subject: "CSC", number: "320", term: winter_2016)
          csc_100 = create(:course, subject: "CSC", number: "100", term: winter_2016)

          changes = Recourse.Scraper.Section.all([csc_100, csc_320])

          sections = for change <- changes, do: change
                      |> Recourse.Repo.insert!
                      |> Recourse.Repo.preload([:course, :meeting_times])

          assert 5 == sections |> length
          assert Enum.all?(sections, & %Recourse.Section{} = &1)

          assert [
            %{course: csc_100},
            %{course: csc_100},
            %{course: csc_320},
            %{course: csc_320},
            %{course: csc_320},
          ] = sections
        end
      end
    end

    context "with multiple queries" do
      it "loads sections for the courses" do
        use_cassette "art 103 and csc 100", match_requests_on: [:query] do
          winter_2016 = create(:term, semester: :winter, year: 2016)
          art = create(:course, subject: "ART", number: "103", term: winter_2016)
          csc = create(:course, subject: "CSC", number: "100", term: winter_2016)

          changes = Recourse.Scraper.Section.all([csc, art])

          sections = for change <- changes, do: change
                      |> Recourse.Repo.insert!
                      |> Recourse.Repo.preload([:course, :meeting_times])

          assert 5 == sections |> length
          assert Enum.all?(sections, & %Recourse.Section{} = &1)

          assert [
            %{course: art},
            %{course: art},
            %{course: art},
            %{course: csc},
            %{course: csc},
          ] = sections
        end
      end
    end

    context "the course doesn't exist" do
      it "returns an empty array" do
        use_cassette "art 112" do
          assert [] == [create(:course, subject: "ART", number: "112")]
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

          inserted_section = [art]
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

        inserted_section = [csc]
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
              location: "MacLaurin Building A144",
              type: "Every Week",
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
end
