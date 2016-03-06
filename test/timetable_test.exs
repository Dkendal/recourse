defmodule Recourse.TimetableTest do
  use Recourse.Case
  alias Recourse.Timetable

  describe ".new/1" do
    it "creates a new struct" do
      result = Timetable.new([1, 2, 3])
      assert result.sections == [1,2,3]
      assert 3 == result.overlaps |> length
    end
  end
end
