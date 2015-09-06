defmodule Recourse.SectionInstructor do
  use Recourse.Web, :model

  schema "SectionInstructors" do
    belongs_to :section, Recourse.Section
    belongs_to :instructor, Recourse.Instructor

    timestamps
  end

  @required_fields ~w(section_id instructor_id)
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
