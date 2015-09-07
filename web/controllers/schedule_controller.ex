defmodule Recourse.ScheduleController do
  use Recourse.Web, :controller

  alias Recourse.Course
  alias Recourse.Section

  use Aruspex.Constraint

  def index(conn, %{"course_ids" => course_ids}) do
    {:ok, pid} = Aruspex.start_link

    (from s in Section,
      select: s,
      join: c in assoc(s, :course),
      where: c.id in ^course_ids,
      preload: [:course],
      order_by: c.id)
    |> Repo.all # [Section]
    |> Enum.group_by(& &1.course) # %{ int: [Section] }
    |> Enum.map(fn {course, sections} ->
      pid |> Aruspex.variables [course]
      pid |> Aruspex.domain [course], sections
    end)

    for_all pid, &non_overlapping/2

    Aruspex.label pid

    sections = for {course, var} <- Aruspex.get_state(pid).variables do
      var.binding
    end

    render(conn, "index.json", sections: sections)
  end

  def non_overlapping(a, b) do
    case !a.time_start in b.time_start..b.time_end &&
         !a.time_end in b.time_start..b.time_end do
      true -> 0
      false -> 1
    end
  end
end
