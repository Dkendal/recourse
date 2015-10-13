defmodule Recourse.ScheduleChannel do
  use Recourse.Web, :channel
  import Ecto.Query
  alias Recourse.Course
  alias Recourse.Repo

  def join("schedules:planner", payload, socket) do
    {:ok, socket}
  end

  def handle_in("courses:search", payload, socket) do
    courses = Repo.all from s in Course
    {:reply, {:ok, %{payload: courses}}, socket}
  end

  def handle_in("make_schedule", payload, socket) do
    sections =
      payload
      |> Recourse.Schedule.build

    {:reply, {:ok, %{payload: sections}}, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
