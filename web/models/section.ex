defmodule Recourse.Section do
  use Recourse.Web, :model

  schema "sections" do
    field :campus, :string
    field :credits, :float
    field :date_end, Ecto.Date
    field :date_start, Ecto.Date
    field :days, {:array, :string}
    field :instructional_method, :string
    field :location, :string
    field :name, :string
    field :registration_code, :string
    field :registration_end, Ecto.Date
    field :registration_start, Ecto.Date
    field :schedule_type, :string
    field :time_end, Ecto.Time
    field :time_start, Ecto.Time
    belongs_to :course, Recourse.Course

    timestamps

    field :seats, :map, virtual: true
    field :waitlist, :map, virtual: true
  end

  @required_fields ~w(
    course_id
    date_end
    date_start
    days
    name
    registration_code
    schedule_type
    time_end
    time_start
  )

  @optional_fields ~w(
    campus
    credits
    instructional_method
    location
    registration_end
    registration_start
  )

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
      %{
        campus: section.campus,
        course: section.course,
        credits: section.credits,
        date_end: section.date_end,
        date_start: section.date_start,
        days: section.days,
        id: section.id,
        instructional_method: section.instructional_method,
        location: section.location,
        registration_code: section.registration_code,
        registration_end: section.registration_end,
        registration_start: section.registration_start,
        schedule_type: section.schedule_type,
        time_end: section.time_end,
        time_start: section.time_start,
        seats: section.seats,
        waitlist: section.waitlist
      }
      |> Poison.Encoder.encode []
    end
  end
end
