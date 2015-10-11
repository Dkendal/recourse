defmodule Recourse.Term do
  use Recourse.Web, :model

  schema "terms" do
    field :year, :integer
    field :semester, Recourse.Semester
    has_many :courses, Recourse.Course

    timestamps
  end

  @required_fields ~w(year semester)
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

defimpl String.Chars, for: Recourse.Term do
  def to_string %{year: y, semester: s} do
    Integer.to_string(y) <> __MODULE__.to_string(s)
  end

  def to_string(:winter), do: "01"
  def to_string(:summer), do: "05"
  def to_string(:fall), do: "09"
end
