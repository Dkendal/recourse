defmodule Recourse.Schedule do
  use Aruspex.Constraint
  import Ecto.Query
  alias Recourse.Section
  alias Recourse.Repo
  alias Ecto.Time

  def build(%{"course_ids" => course_ids, "settings" => settings}) do
    {:ok, pid} = Aruspex.start_link

    course_ids
    |> get_sections
    |> init_variables(pid)
    |> init_constraints(settings, pid)

    Dict.values Aruspex.find_solution(pid)
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


  defp init_variables(sections, pid) do
    sections
    |> Enum.group_by(& {&1.course_id, &1.schedule_type}) # %{ int: [Section] }
    |> Enum.map fn {grouping, sections} ->
      Aruspex.variable(pid, grouping, sections)
      grouping
    end
  end

  defp init_constraints(variables, settings, pid) do
    for x <- variables, y <- variables, x > y do
      Aruspex.post pid, constraint(
        variables: [x, y],
        function: &no_conflict/1)
    end

    for v <- variables do
      Aruspex.post pid, constraint(
        variables: [v],
        function: time_preference(settings))
    end

    variables
  end

  defp time_preference(%{"startTime" => start_time, "endTime" => end_time}) do
    {:ok, start_time} = Time.cast(start_time)
    {:ok, end_time} = Time.cast(end_time)

    fn [%{time_start: s, time_end: e}] ->
      after?(s, start_time) + before?(e, end_time)
    end
  end

  defp after? t1, t2 do
    if unset_time?(t2) or t1 >= t2 do
      0
    else
      time_penalty(t1, t2)
    end
  end

  defp before? t1, t2 do
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

  def unset_time?(%Time{hour: 0, min: 0, sec: 0}), do: true
  def unset_time?(_), do: false

  defp get_sections course_ids do
    Repo.all from s in Section,
      select: s,
      join: c in assoc(s, :course),
      where: c.id in ^course_ids,
      preload: [:course],
      order_by: c.id
  end
end
