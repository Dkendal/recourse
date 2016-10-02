defmodule Frontend.Page do
  use Frontend.Web, :aliases
  use Frontend.Web, :model

  schema "page" do
    has_many :terms, Term
  end

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [])
    |> cast_assoc(:terms)
  end
end
