defmodule Recourse.Schedule do
  use Aruspex.Constraint
  import Ecto.Query
  alias Recourse.Section
  alias Recourse.Repo

  def build course_ids do
    {:ok, pid} = Aruspex.start_link

    courses = (from s in Section,
    select: s,
    join: c in assoc(s, :course),
    where: c.id in ^course_ids,
    preload: [:course],
    order_by: c.id)
    |> Repo.all # [Section]
    |> Enum.group_by(& {&1.course_id, &1.schedule_type}) # %{ int: [Section] }
    |> Enum.map(fn {course, sections} ->
      pid |> Aruspex.variable(course, sections)
      course
    end)

    for x <- courses, y <- courses, x > y do
      pid |> Aruspex.post constraint(
      variables: [x, y],
      function: &no_conflict/1)
    end

    Aruspex.find_solution(pid)
    |> Dict.values
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
end
