defmodule Recourse.Factory do
  use ExMachina.Ecto, repo: Recourse.Repo
  alias Ecto.Date
  alias Ecto.Time

  def factory(:term) do
    %Recourse.Term{
      year: 2015,
      semester: :winter
    }
  end

  def factory(:course) do
    %Recourse.Course{
      subject: Faker.Lorem.sentence(1),
      number: sequence(:course_number, &"#{&1}"),
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
    }
    |> cast
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
end
