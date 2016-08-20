defmodule Recourse.Term.FormTest do
  alias Recourse.Term
  alias Recourse.Term.Form
  use ExUnit.Case, async: true

  @term %Term{semester: :spring, year: 2020, id: 1}

  describe "#to_options" do
    test "generates a list of tuples with id and name" do
      assert Form.to_options([@term]) == [{"Spring 2020", 1}]
    end
  end
end
