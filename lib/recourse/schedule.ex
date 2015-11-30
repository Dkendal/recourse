defmodule Recourse.Schedule do
  use Aruspex.Constraint
  alias Recourse.Section
  alias Recourse.Repo
  import Recourse.Digraph
  import Ecto.Query
  import __MODULE__.Constraint

  def build(%{"course_ids" => course_ids, "settings" => settings}) do
    {:ok, pid} = Aruspex.start_link

    course_ids
    |> get_sections
    |> init_variables(pid)
    |> init_constraints(settings, pid)

    Aruspex.find_solution(pid)
    |> Aruspex.State.values
    |> components
  end

  def components values do
    g = :digraph.new

    values
    |> Enum.map(add_vertex g)

    for x <- values, y <- values, x != y do
      if no_conflict([x, y]) > 0 do
        add_edge g, x, y
      end
    end

    :digraph_utils.components g
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

  defp get_sections course_ids do
    Repo.all from s in Section,
      select: s,
      join: c in assoc(s, :course),
      where: c.id in ^course_ids,
      preload: [:course],
      order_by: c.id
  end
end
