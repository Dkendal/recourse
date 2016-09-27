defmodule Recourse.Section do
  use Recourse.Web, :model

  @derive [{Msgpax.Packer, fields: [
     :meeting_times,
     :course_id,
     :schedule_type,
     :name,
   ]}]

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
    field :tba, :boolean, default: false
    belongs_to :course, Recourse.Course
    has_many :meeting_times, Recourse.MeetingTime

    timestamps

    field :seats, :map, virtual: true
    field :waitlist, :map, virtual: true
    field :overlap, :any, virtual: :true
  end

  @required_fields [
    :campus,
    :credits,
    :instructional_method,
    :registration_end,
    :registration_start,
    :course_id,
    :date_end,
    :date_start,
    :name,
    :crn,
    :schedule_type,
    :course_id,
    :date_end,
    :date_start,
    :name,
    :crn,
    :schedule_type,
    :tba,
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

  def tba?(%__MODULE__{meeting_times: meeting_times}) do
    Enum.all?(meeting_times, & &1.tba)
  end

  def put_tba_change(change) do
    change
    |> Ecto.Changeset.put_change(:tba, tba?(change.data))
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
