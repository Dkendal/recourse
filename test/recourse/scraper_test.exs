defmodule Recourse.ScraperTest do
  use ExUnit.Case
  alias Recourse.Term

  test "returns a list of courses" do
    Recourse.Scraper.start

    actual =
      Recourse.Scraper.courses([2015, :spring, ["CSC"], "100", "200"])

    assert length(actual) > 0
    assert Enum.all?(actual, &is_course?/1)
  end

  test "parsing a course" do
    expected =
      %Recourse.Course{
        subject: "CSC",
        number: "100",
        title: "ELEMENTARY COMPUTING" }

    actual =
      Recourse.Scraper.parse("CSC 100 - ELEMENTARY COMPUTING", :course)

    assert expected == actual
  end

  defp is_course?(%Recourse.Course{}), do: true
  defp is_course?(_), do: false
end
