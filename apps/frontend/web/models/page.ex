defmodule Frontend.Page do
  use Frontend.Web, :aliases
  use Frontend.Web, :model

  schema "page" do
    field :selected_term_id, :integer, virtual: true
    field :search_text, :string, virtual: true, default: ""
    field :selected_course_ids, {:array, :integer}, virtual: true, default: []
  end

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:selected_term_id, :search_text, :selected_course_ids])
  end
end
