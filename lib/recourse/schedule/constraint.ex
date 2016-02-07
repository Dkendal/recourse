defmodule Recourse.Schedule.Constraint do
  alias Recourse.{Section}
  alias Recourse.MeetingTime, as: MT

  use Aruspex.Constraint
  alias Ecto.Time

  @type cost :: number
  @type t :: ([Section.t] -> cost)

  @spec open_seats([Section.t]) :: number
  def open_seats([section]) do
    if section.seats.remaining > 0 do
      0
    else
      100 + section.waitlist.actual
    end
  end

  @spec no_conflict([Section.t]) :: 0 | 1000
  def no_conflict([a, b]),
    do: if no_time_conflict?(a, b), do: 0, else: 1000

  @spec no_time_conflict?(Section.t, Section.t) :: boolean
  def no_time_conflict?(s1, s2) do
    for %MT{start_time: ts1, end_time: te1} = m1 <- s1.meeting_times,
        %MT{start_time: ts2, end_time: te2} = m2 <- s2.meeting_times do
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

  @spec disjoint_days?(MT.t, MT.t) :: boolean
  def disjoint_days?(%MT{days: d1}, %MT{days: d2}) do
    [x, y] = for s <- [d1, d2], do: :sets.from_list(s)
    :sets.is_disjoint x, y
  end

  @spec time_preference(%{String.t => String.t}) :: t
  def time_preference(%{"startTime" => start_time, "endTime" => end_time}) do
    preferred_start = Ecto.DateTime.cast!(start_time) |> Ecto.DateTime.to_time
    preferred_end = Ecto.DateTime.cast!(end_time) |> Ecto.DateTime.to_time
    time_preference preferred_start, preferred_end
  end

  @spec time_preference(Time.t, Time.t) :: t
  def time_preference(preferred_start, preferred_end) do
    do_time_preference = fn
      (%MT{start_time: start_t, end_time: end_t}, total) ->
        after?(end_t, preferred_end) +
        before?(start_t, preferred_start) +
        total
    end

    fn ([%Section{} = section]) ->
      Enum.reduce section.meeting_times, 0, do_time_preference
    end
  end

  @spec after?(Time.t, Time.t) :: cost
  def after? t1, t2 do
    if unset_time?(t2) or t1 >= t2 do
      0
    else
      time_penalty(t1, t2)
    end
  end

  @spec before?(Time.t, Time.t) :: cost
  def before? t1, t2 do
    if unset_time?(t2) or t1 <= t2 do
      0
    else
      time_penalty(t1, t2)
    end
  end

  @spec time_penalty(Time.t, Time.t) :: float
  defp time_penalty t1, t2 do
    abs(time_to_f(t1) - time_to_f(t2))
  end

  @spec time_to_f(Time.t) :: float
  defp time_to_f(%Time{hour: h, min: m}), do: h + m/60

  @spec unset_time?(Time.t | any) :: boolean
  defp unset_time?(%Time{hour: 0, min: 0, sec: 0}), do: true
  defp unset_time?(_), do: false
end
