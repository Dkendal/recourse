defmodule Recourse.Scraper.Section.RequestTest do
  alias Recourse.Scraper.Section.Request
  use Recourse.Case

  describe "#to_params" do
    it "converts a course into a query string" do
      course = %Recourse.Course{
        subject: "CSC",
        number: "100",
        term: %Recourse.Term{
          semester: :spring,
          year: 2015
        }
      }

      assert Request.to_params([course], "") ==
        "crse_in=100&schd_in=&subj_in=CSC&term_in=201501"
    end
  end

  describe "#query_plan" do
    context "with a single course" do
      it "would issue a single request" do
        assert 1 == Request.query_plan([build(:course)]) |> length
      end

      it "returns the course and the uri" do
        course = build(:course, subject: "ENGR", number: "100")
        assert [
          {[^course],
            "sections?crse_in=100&schd_in=&subj_in=ENGR&term_in=201501"}
        ] = Request.query_plan([course])
      end
    end

    context "with 2 courses in different subjects" do
      it "would issue 2 requests" do
        csc = build(:course, subject: "CSC", number: 100)
        seng = build(:course, subject: "SENG", number: 100)

        assert 2 == Request.query_plan([csc, seng]) |> length

        assert [
          {[^csc],
            "sections?crse_in=100&schd_in=&subj_in=CSC&term_in=201501"},
          {[^seng],
            "sections?crse_in=100&schd_in=&subj_in=SENG&term_in=201501"},
        ] = Request.query_plan([csc, seng])
      end
    end

    context "with 2 courses in the same subject" do
      it "would issue 1 request with a wildcard" do
        math_100 = build(:course, subject: "MATH", number: 100)
        math_200 = build(:course, subject: "MATH", number: 200)

        assert 1 == Request.query_plan([math_100, math_200]) |> length

        assert [
          { courses,
            "sections?crse_in=%25&schd_in=&subj_in=MATH&term_in=201501"}
        ] = Request.query_plan([math_100, math_200])

        assert Enum.member?(courses, math_100)
        assert Enum.member?(courses, math_200)
      end
    end

    context "with mix of same and different subjects" do
      it "groups subjects" do
        math_100 = build(:course, subject: "MATH", number: 100)
        math_200 = build(:course, subject: "MATH", number: 200)
        csc_100 = build(:course, subject: "CSC", number: 100)

        assert [
          { _, "sections?crse_in=100&schd_in=&subj_in=CSC&term_in=201501"},
          { _, "sections?crse_in=%25&schd_in=&subj_in=MATH&term_in=201501"},
        ] = Request.query_plan([math_100, math_200, csc_100])
      end
    end
  end
end
