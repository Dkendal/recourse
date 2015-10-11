defmodule Recourse.Section do
  use Recourse.Web, :model

  schema "sections" do
    field :registration_code, :string
    field :schedule_type, :string
    field :time_start, Timex.Ecto.Time
    field :time_end, Timex.Ecto.Time
    field :days, {:array, :string}
    field :location, :string
    field :date_start, Timex.Ecto.Date
    field :date_end, Timex.Ecto.Date
    field :registration_start, :string
    field :registration_end, :string
    field :campus, :string
    field :credits, :decimal
    field :instructional_method, :string
    belongs_to :course, Recourse.Course
    belongs_to :term, Recourse.Term

    timestamps
  end

  @required_fields ~w(registration_code schedule_type time_start time_end days location date_start date_end registration_start registration_end campus credits instructional_method)
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

  defimpl Poison.Encoder, for: __MODULE__ do
    def encode(section, _options) do
      %{id: section.id,
        registration_code: section.registration_code,
        schedule_type: section.schedule_type,
        time_start: section.time_start,
        time_end: section.time_end,
        days: section.days,
        location: section.location,
        date_start: section.date_start,
        date_end: section.date_end,
        registration_start: section.registration_start,
        registration_end: section.registration_end,
        campus: section.campus,
        credits: section.credits,
        instructional_method: section.instructional_method,
        course: section.course}
      |> Poison.Encoder.encode []
    end
  end
end
