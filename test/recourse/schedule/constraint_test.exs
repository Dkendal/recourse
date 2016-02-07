defmodule Recourse.ConstraintTest do
  use Recourse.Case
  alias Recourse.Repo
  alias Recourse.Term
  alias Recourse.Course
  alias Recourse.Section
  alias Recourse.Schedule.Constraint
  alias Ecto.Time
  import Repo, only: [insert: 1]

  describe "no_time_conflict?/2" do
    context "when the two sections do not occur during the same time" do
      it "returns true" do
        four_o_clock = %Ecto.Time{hour: 16, min: 0, sec: 0}
        noon = %Ecto.Time{hour: 12, min: 0, sec: 0}

        mt1 = build(:meeting_time, start_time: four_o_clock) |> duration(80)

        mt2 = %{mt1 | start_time: noon} |> duration(80)

        csc = build :section, meeting_times: [mt1]
        math = %{csc | meeting_times: [mt2]}

        assert Constraint.no_time_conflict?(csc, math) == true
      end
    end

    context "when two sections occur during the same time on diffent days" do
      it "returns true" do
        mt1 = build :meeting_time, days: ~w(M)
        mt2 = %{mt1 | days: ~w(T)}

        csc = build :section, meeting_times: [mt1]
        math = %{csc | meeting_times: [mt2]}

        assert Constraint.no_time_conflict?(csc, math) == true
      end
    end

    context "when the two sections occur during the same time" do
      it "returns false" do
        section = build :section

        assert Constraint.no_time_conflict?(section, section) == false
      end
    end
  end

  describe "disjoint_days?" do
    context "when two meeting times don't have any days in common" do
      it "returns true" do
        mt1 = build :meeting_time, days: ["T"]
        mt2 = build :meeting_time, days: ["M"]
        assert Constraint.disjoint_days?(mt1, mt2) == true
      end
    end

    context "when two meeting times share days" do
      it "returns false" do
        mt = build :meeting_time
        assert Constraint.disjoint_days?(mt, mt) == false
      end
    end
  end
end
