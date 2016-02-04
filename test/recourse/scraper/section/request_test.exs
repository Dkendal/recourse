defmodule Recourse.Scraper.Section.RequestTest do
  alias Recourse.Scraper.Section.Request
  use Recourse.Case

  describe "#to_params" do
    it "converts a course into a query string" do
      course = %Recourse.Course{
        subject: "CSC",
        number: "100",
        term: %Recourse.Term{
          semester: :winter,
          year: 2015
        }
      }

      assert Request.to_params(course) ==
        "crse_in=100&schd_in=&subj_in=CSC&term_in=201501"
    end
  end
end
