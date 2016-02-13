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
      preload: [courses: c],
      order_by: [c.subject, c.number]

    {:reply, {:ok, %{payload: terms}}, socket}
  end

  def handle_in("make_schedule", options, socket) do
    sections = Schedule.build(options)
    components = Schedule.components sections

    min_start_time =
      sections
      |> Enum.flat_map(& for mt <- &1.meeting_times, do: mt.start_time)
      |> wrap
      |> Enum.min

    max_end_time =
      sections
      |> Enum.flat_map(& for mt <- &1.meeting_times, do: mt.end_time)
      |> wrap
      |> Enum.max

    payload = %{
      sections: components,
      earliestStartTime: min_start_time,
      latestEndTime: max_end_time
    }

    {:reply, {:ok, %{payload: payload}}, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  defp wrap([]), do: [""]
  defp wrap(x), do: x
end
