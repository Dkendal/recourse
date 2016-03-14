defmodule Recourse.SectionTest do
  use Recourse.ModelCase
  use Recourse.Assertions

  alias Recourse.{Section, MeetingTime}

  @valid_attrs %{
    campus: "some content",
    course_id: 1,
    credits: "120.5",
    date_end: "2015-12-12",
    date_start: "2015-12-12",
    days: [],
    instructional_method: "some content",
    location: "some content",
    name: "A01",
    crn: "some content",
    registration_end: "2015-12-12",
    registration_start: "2015-12-12",
    schedule_type: "some content",
    end_time: "14:00:00",
    start_time: "14:00:00",
  }

  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Section.changeset(%Section{}, @valid_attrs)
    assert_valid changeset
  end

  test "changeset with invalid attributes" do
    changeset = Section.changeset(%Section{}, @invalid_attrs)
    refute changeset.valid?
  end

  describe "tba?/1" do
    import Recourse.Section, only: [tba?: 1]

    it "is false" do
      section =  %Section{
        meeting_times: [
          %MeetingTime{ tba: true },
          %MeetingTime{ tba: false },
        ],
      }

      assert tba?(section) == false
    end

    context "when all meeting times are tba" do
      it "is true" do
        section =  %Section{
          meeting_times: [
            %MeetingTime{ tba: true },
            %MeetingTime{ tba: true },
          ],
        }

        assert tba?(section) == true
      end
    end

    context "when meeting times are not loaded" do
      it "fails" do
        assert_raise Protocol.UndefinedError, fn ->
          tba?(%Section{})
        end
      end
    end
  end
end
