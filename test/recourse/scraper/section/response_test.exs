defmodule Recourse.Scraper.Section.ResponseTest do
  use Recourse.Case

  describe "transform/1" do
    import Recourse.Scraper.Section.Response, only: [transform: 1]

    test "transforming a section" do
      input = %{
        "Date Range" => "Jan 05, 2015 - Apr 02, 2015",
        "Days" => "MR",
        "Instructors" => "Celina Gay  Berg (P)",
        "Time" => "10:00 am - 11:20 am",
        "Type" => "Every Week",
        "Where" => "MacLaurin Building A144"}

      actual = transform(input)

      assert_attributes(
        actual,
        start_time: %Ecto.Time{hour: 10, min: 0, sec: 0},
        end_time: %Ecto.Time{hour: 11, min: 20, sec: 0},
        days: ~W(M R),
        location: "MacLaurin Building A144",
        date_start: %Ecto.Date{year: 2015, month: 1, day: 5},
        date_end: %Ecto.Date{year: 2015, month: 4, day: 2})
    end

    context "has TBA fields" do
      it "sets the tba column" do
        input = %{
          "Date Range" => "Jan 05, 2015 - Apr 02, 2015",
          "Days" => "\u00A0", # non breaking space
          "Instructors" => "TBA",
          "Time" => "TBA",
          "Type" => "Every Week",
          "Where" => "some place"}

        result = transform(input)

        assert_attributes(
          result,
          tba: true,
          start_time: nil,
          end_time: nil,
          days: nil,
          location: "some place",
          date_start: %Ecto.Date{year: 2015, month: 1, day: 5},
          date_end: %Ecto.Date{year: 2015, month: 4, day: 2})
      end
    end
  end
end
