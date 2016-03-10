defmodule Recourse.MeetingTime do
  alias Recourse.{Web, Section, Timetable}
  alias Ecto.{Date, Time}

  use Web, :model

  schema "meeting_times" do
    field :date_end, Date
    field :date_start, Date
    field :days, {:array, :string}
    field :instructors, {:array, :string}
    field :location, :string
    field :end_time, Time
    field :start_time, Time
    field :type, :string

    belongs_to :section, Section

    timestamps

    field :overlap, :any, virtual: :true
  end

  def overlapping?(a, b), do: not seperate?(a, b)
  def seperate?(a, b) do
    cond do
      disjoint_days?(a, b) ->
        true
      a.end_time <= b.start_time ->
        true
      b.end_time <= a.start_time ->
        true
      true ->
        false
    end
  end

  def disjoint_days?(%{days: d1}, %{days: d2}) do
    [x, y] = for s <- [d1, d2], do: :sets.from_list(s)
    :sets.is_disjoint(x, y)
  end

  @required_fields ~w(
    date_end
    date_start
    days
    instructors
    location
    section_id
    end_time
    start_time
    type
  )

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
    def encode(meeting_time, _options) do
      %{
        date_end: meeting_time.date_end,
        date_start: meeting_time.date_start,
        days: meeting_time.days,
        instructors: meeting_time.instructors,
        location: meeting_time.location,
        end_time: meeting_time.end_time,
        start_time: meeting_time.start_time,
        type: meeting_time.type
      }
      |> Poison.Encoder.encode([])
    end
  end
end
