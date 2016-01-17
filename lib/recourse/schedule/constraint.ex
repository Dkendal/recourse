defmodule Recourse.Schedule.Constraint do
  alias Recourse.{Section, MeetingTime}

  use Aruspex.Constraint
  alias Ecto.Time

  def open_seats([section]) do
    if section.seats.remaining > 0 do
      0
    else
      100 + section.waitlist.actual
    end
  end

  def no_conflict([a, b]),
    do: if no_time_conflict?(a, b), do: 0, else: 1000

  @spec no_time_conflict?(Section.t, Section.t) :: boolean
  def no_time_conflict?(s1, s2) do
    for %{time_start: ts1, time_end: te1} = m1 <- s1.meeting_times,
        %{time_start: ts2, time_end: te2} = m2 <- s2.meeting_times do
      cond do
        disjoint_days?(m1, m2) ->
          true
        te1 <= ts2 ->
          true
        te2 <= ts1 ->
          true
        true ->
          false
      end
    end
    |> Enum.all?
  end

  def disjoint_days?(%MeetingTime{days: d1}, %MeetingTime{days: d2}) do
    [x, y] = for s <- [d1, d2], do: :sets.from_list(s)
    :sets.is_disjoint x, y
  end

  def time_preference(%{"startTime" => start_time, "endTime" => end_time}) do
    {:ok, start_time} = Time.cast(start_time)
    {:ok, end_time} = Time.cast(end_time)

    fn [%{time_start: s, time_end: e}] ->
      after?(s, start_time) + before?(e, end_time)
    end
  end

  def after? t1, t2 do
    if unset_time?(t2) or t1 >= t2 do
      0
    else
      time_penalty(t1, t2)
    end
  end

  def before? t1, t2 do
    if unset_time?(t2) or t1 <= t2 do
      0
    else
      time_penalty(t1, t2)
    end
  end

  defp time_penalty t1, t2 do
    abs(time_to_f(t1) - time_to_f(t2))
  end

  defp time_to_f(%{hour: h, min: m}), do: h + m/60

  defp unset_time?(%Time{hour: 0, min: 0, sec: 0}), do: true
  defp unset_time?(_), do: false
end
