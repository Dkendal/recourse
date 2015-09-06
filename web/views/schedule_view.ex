defmodule Recourse.ScheduleView do
  use Recourse.Web, :view

  def render("index.json", %{schedule: schedule}) do
    %{data: render_one(schedule, Recourse.ScheduleView, "schedule.json")}
  end

  def render("schedule.json", %{schedule: schedule}) do
    %{}
  end
end
