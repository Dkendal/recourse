defmodule Recourse.ScheduleFormTest do
  use Recourse.ModelCase

  alias Recourse.{ScheduleForm, Course}

  describe "#changeset" do
    test "with valid attrs" do
      params = %{}

      assert_valid change %ScheduleForm{}, params
    end
  end
end