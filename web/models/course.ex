defmodule Recourse.Course do
  use Recourse.Web, :model

  schema "courses" do
    field :title, :string
    field :subject, :string
    field :number, :string
    has_many :sections, Recourse.Section
    belongs_to :term, Recourse.Term

    timestamps
  end

  @type t :: %__MODULE__{}

  @required_fields [
    :title,
    :subject,
    :number,
    :term_id,
  ]

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
  end

  defimpl Poison.Encoder, for: __MODULE__ do
    def encode(course, _options) do
      %{id: course.id,
        title: course.title,
        subject: course.subject,
        number: course.number}
      |> Poison.Encoder.encode([])
    end
  end
end
