defmodule Recourse.ScheduleChannel do
  use Recourse.Web, :channel
  import Ecto.Query
  alias Recourse.Course
  alias Recourse.Term
  alias Recourse.Repo
  alias Recourse.Schedule

  @spec join(String.t, map, Phoenix.Socket.t) :: {:ok, Phoenix.Socket.t}
  def join("schedules:planner", _payload, socket) do
    {:ok, socket}
  end

  def handle_in("terms:search", _payload, socket) do
    terms = Repo.all from t in Term,
      join: c in assoc(t, :courses),
      join: s in assoc(c, :sections),
      preload: [courses: c]

    reply terms, socket
  end

  def handle_in("courses:search", _payload, socket) do
    courses = Repo.all from s in Course

    reply courses, socket
  end

  def handle_in("make_schedule", options, socket) do
    sections = Schedule.build(options)
    components = Schedule.components sections

    min_start_hour =
    sections
    |> Enum.map(& &1.time_start)
    |> Enum.min

    max_end_hour =
    sections
    |> Enum.map(& &1.time_end)
    |> Enum.max

    payload = %{
      sections: components,
      minStartHour: min_start_hour,
      maxEndHour: max_end_hour
    }

    reply payload, socket
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  defp reply payload, socket do
    {:reply, {:ok, %{payload: payload}}, socket}
  end
end
