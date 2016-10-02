defmodule Recourse.Section do
  use Recourse.Web, :model

  @derive [{Msgpax.Packer, fields: [
     :course_id,
     :id,
     :meeting_times,
     :name,
     :schedule_type,
   ]}]

  schema "sections" do
    field :campus, :string
    field :credits, :float
    field :date_end, :date
    field :date_start, :date
    field :instructional_method, :string
    field :name, :string
    field :crn, :string
    field :registration_end, :date
    field :registration_start, :date
    field :schedule_type, :string, default: ""
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
end
