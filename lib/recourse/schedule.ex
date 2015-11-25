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
      function: &non_overlapping/1)
    end

    Aruspex.find_solution(pid)
    |> Dict.values
  end

  defp non_overlapping([a, b]) do
    (!during_section(a.time_start, b) and
    !during_section(a.time_end, b))
    |> case do
      true -> 0
      false -> 1
    end
  end

  defp during_section(t, s) do
    t |> between(s.time_start..s.time_end)
  end

  defp between(t1, t2..t3) do
    t1 > t2 and t1 < t3
  end
end
