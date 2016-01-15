defmodule Recourse.Factory do
  use ExMachina.Ecto, repo: Recourse.Repo
  alias Ecto.Date
  alias Ecto.Time

  @subjects ~W(
    ENGL
    MATH
    CSC
    CENG
    SENG
    CHEM
    ENGR
  )

  def factory(:term) do
    %Recourse.Term{
      year: 2015,
      semester: :winter
    }
  end

  def factory(:course) do
    %Recourse.Course{
      subject: Enum.random(@subjects),
      number: sequence(:course_number, &"#{&1 + 100}"),
      title: Faker.Lorem.sentence,
      term: build(:term)
    }
  end

  def factory(:section) do
    %Recourse.Section{
      campus: "main campus",
      course: build(:course),
      credits: 3.0,
      date_end: "2015-04-01",
      date_start: "2015-01-01",
      days: ~W(M W F),
      instructional_method: "face-to-face",
      location: "some building",
      name: sequence(:section_name, &"#{&1}"),
      registration_code: sequence(:crn, &"C#{&1}"),
      registration_end: "2015-01-15",
      registration_start: "2014-09-30",
      schedule_type: "Lecture",
      time_end: "13:20:00",
      time_start: "12:00:00"
    }
    |> cast
  end

  def random_time(section) do
    section
    |> random_start
    |> random_days
    |> porportional_length
  end

  def random_start(section) do
    hr = Enum.random 8..17
    mins = Enum.random [0, 30]

    %{section | time_start: %Time{hour: hr, min: mins, sec: 0}}
  end

  @days ~w(M T W R F)
  def random_days(section, no_days \\ nil) do
    no_days = no_days || Enum.random(1..3)
    days = Enum.take_random @days, no_days
    %{section | days: days}
  end

  def random_lab_time(section) do
    section = random_start random_days(section, 1)
    time_end = add_mins section.time_start, 50
    %{section | time_end: time_end}
  end

  def porportional_length(section) do
    no_days = length(section.days)
    mins = round((4 - no_days) * 60) + 20

    time_end = add_mins(section.time_start, mins)

    %{section | time_end: time_end}
  end

  def cast(p) do
    params = Map.drop p, [:__struct__,]

    updated = p.__struct__.changeset(
      struct(p.__struct__),
      params
    ).changes

    Map.merge p, updated
  end

  def as_lecture(section) do
    %{section | schedule_type: "Lecture"}
  end

  def as_lab(section) do
    %{section | schedule_type: "Lab"}
  end

  def as_tutorial(section) do
    %{section | schedule_type: "Tutorial"}
  end

  def cast_date({:ok, d}), do: d
  def cast_date d do
    d |> Date.cast |> cast_date
  end

  def cast_time({:ok, t}), do: t
  def cast_time t do
    t |> Time.cast |> cast_time
  end

  def lazy(record) do
    record
    |> Enum.reduce(record, fn
      ({k, v}, acc) when is_function(v) ->
        Map.update acc, k, :error, & &1.(acc)
      (_, acc) ->
        acc
    end)
  end

  def add_mins(t, mins) do
    import Ecto.Time
    import :qdate

    t = to_erl t
    t = {{2015,1,1}, t}
    {_, t} = to_date add_minutes(mins, t)
    {:ok, t} = Ecto.Time.cast t
    t
  end
end
