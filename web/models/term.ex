defmodule Recourse.Term do
  use Recourse.Web, :model

  schema "terms" do
    field :name, :string
    field :start, Ecto.Date
    field :end, Ecto.Date

    timestamps
  end

  @required_fields ~w(name start end)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
