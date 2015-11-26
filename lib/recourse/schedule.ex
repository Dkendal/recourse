defmodule Recourse.Schedule do
  use Aruspex.Constraint
  import Ecto.Query
  alias Recourse.Section
  alias Recourse.Repo

  def build course_ids do
    {:ok, pid} = Aruspex.start_link

    course_ids
    |> get_sections
    |> init_variables(pid)
    |> init_constraints(pid)

    Dict.values Aruspex.find_solution(pid)
  end

  def no_conflict([a, b]) do
    if days_different?(a, b) or no_time_conflict?(a, b) do
      0
    else
      1
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

  defp init_constraints(variables, pid) do
    for x <- variables, y <- variables, x > y do
      Aruspex.post pid, constraint(
        variables: [x, y],
        function: &no_conflict/1)
    end
  end

  defp get_sections course_ids do
    Repo.all from s in Section,
      select: s,
      join: c in assoc(s, :course),
      where: c.id in ^course_ids,
      preload: [:course],
      order_by: c.id
  end
end
