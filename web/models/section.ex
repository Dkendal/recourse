defmodule Recourse.Section do
  use Recourse.Web, :model

  schema "sections" do
    field :campus, :string
    field :credits, :float
    field :date_end, Ecto.Date
    field :date_start, Ecto.Date
    field :instructional_method, :string
    field :name, :string
    field :crn, :string
    field :registration_end, Ecto.Date
    field :registration_start, Ecto.Date
    field :schedule_type, :string
    belongs_to :course, Recourse.Course
    has_many :meeting_times, Recourse.MeetingTime

    timestamps

    field :seats, :map, virtual: true
    field :waitlist, :map, virtual: true
  end

  @required_fields ~w(
    course_id
    date_end
    date_start
    name
    crn
    schedule_type
  )

  @optional_fields ~w(
    campus
    credits
    instructional_method
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
        id: section.id,
        instructional_method: section.instructional_method,
        crn: section.crn,
        registration_end: section.registration_end,
        registration_start: section.registration_start,
        schedule_type: section.schedule_type,
        seats: section.seats,
        waitlist: section.waitlist,
        meeting_times: section.meeting_times
      }
      |> Poison.Encoder.encode([])
    end
  end
end
