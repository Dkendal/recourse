defmodule Frontend.PageTest do
  use Frontend.Web, :aliases
  use Frontend.ModelCase

  describe "#changeset/2" do
    test "creating a valid changeset" do
      params = %{
        "selected_term_id" => "1",
        "search_text" => "sup",
        "selected_course_ids" => ["1", "2"]
      }

      changeset = Page.changeset(%Page{}, params)

      assert changeset.valid?

      assert changeset.changes.selected_term_id == 1
      assert changeset.changes.search_text == "sup"
      assert changeset.changes.selected_course_ids == [1, 2]
    end
  end
end
