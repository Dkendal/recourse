defmodule Recourse.ScheduleForm do
  use Recourse.Web, :model

  @moduledoc """
  Form object for schedules
  """

  # not a real table
  schema "schedules" do
    has_many :courses, Recourse.Course
  end


  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [])
    |> cast_assoc(:courses)
  end
end
