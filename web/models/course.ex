defmodule Recourse.Course do
  use Recourse.Web, :model

  schema "courses" do
    field :title, :string
    field :subject, :string
    field :number, :string
    field :description, :string
    field :requirement, :string
    has_many :sections, Recourse.Section
    belongs_to :term, Recourse.Term

    timestamps
  end

  @required_fields ~w(title subject number term_id)
  @optional_fields ~w(description requirement)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  defimpl Poison.Encoder, for: __MODULE__ do
    def encode(course, _options) do
      %{id: course.id,
        title: course.title,
        subject: course.subject,
        number: course.number,
        description: course.description,
        requirement: course.requirement}
      |> Poison.Encoder.encode []
    end
  end
end
