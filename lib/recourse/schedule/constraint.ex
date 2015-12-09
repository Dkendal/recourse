defmodule Recourse.Schedule.Constraint do
  use Aruspex.Constraint
  alias Ecto.Time

  def open_seats([section]) do
    if section.seats.remaining > 0 do
      0
    else
      100 + section.waitlist.actual
    end
  end

  def no_conflict([a, b]) do
    if days_different?(a, b) or no_time_conflict?(a, b) do
      0
    else
      1000
    end
  end

  def no_time_conflict?(
    %{time_start: t1, time_end: t2},
    %{time_start: s1, time_end: s2}) do
    cond do
      t2 <= s1 -> true
      s2 <= t1 -> true
      true -> false
    end
  end

  def days_different?(a, b) do
    a = Enum.into a.days, HashSet.new
    b = Enum.into b.days, HashSet.new
    Set.disjoint? a, b
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
