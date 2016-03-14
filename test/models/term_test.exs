defmodule Recourse.TermTest do
  use Recourse.ModelCase

  alias Recourse.Term

  @valid_attrs %{semester: :spring, year: 2015}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Term.changeset(%Term{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Term.changeset(%Term{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "to_string returns the term code" do
    assert "201501" ==
      to_string(%Term{year: 2015, semester: :spring})
  end
end
