defmodule Recourse.MeetingTime do
  alias Recourse.{Web, Section}
  alias Ecto.{Date, Time}

  use Web, :model

  @derive [{Msgpax.Packer, fields: [
     :end_time,
     :start_time,
     :days
   ]}]

  schema "meeting_times" do
    field :date_end, Date, default: ~d[2000-01-01]
    field :date_start, Date, default: ~d[2000-12-31]
    field :days, {:array, :string}, default: []
    field :instructors, {:array, :string}, default: []
    field :location, :string, default: ""
    field :end_time, Time
    field :start_time, Time
    field :type, :string, default: ""
    field :tba, :boolean, default: false

    belongs_to :section, Section

    timestamps

    field :overlap, :any, virtual: :true
    field :day, :string, virtual: :true
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

  @required_fields [
    :date_end,
    :date_start,
    :days,
    :instructors,
    :location,
    :section_id,
    :type,
    :tba,
  ]

  @optional_fields [
    :end_time,
    :start_time,
  ]

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
