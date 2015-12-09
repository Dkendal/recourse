defmodule Recourse.Scraper.SeatsTest do
  use Recourse.Case, async: false

  setup_all do
    Recourse.Scraper.start
    :ok
  end

  test "find/1 returns seat info for a section" do
    term = build(:term, year: 2016, semester: :winter)
    course = create(:course, term: term)
    section = create(:section, registration_code: "20765", course: course )

    use_cassette "seats for 20765" do
      actual = Recourse.Scraper.Seats.find(section)
      assert actual == %{
        seats: %{
          capacity: 10,
          actual: 10,
          remaining: 0
        },
        waitlist: %{
          capacity: 100,
          actual: 2,
          remaining: 98
        }
      }
    end
  end
end
