defmodule Frontend.PageTest do
  use Frontend.Web, :aliases
  use Frontend.ModelCase

  describe "#changeset/2" do
    test "creating a valid changeset" do
      changeset = Page.changeset(%Page{}, %{})
      assert changeset.valid?
    end
  end
end
