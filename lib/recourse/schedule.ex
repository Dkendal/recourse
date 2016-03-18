defmodule Recourse.Schedule do
  alias Recourse.Registration
  alias Recourse.Repo
  alias Recourse.Section
  use Aruspex.Constraint
  import Recourse.Digraph
  import Ecto.Query
  import __MODULE__.Constraint

  def build(%{"course_ids" => course_ids, "settings" => settings}) do
    {:ok, pid} = Aruspex.start_link

    # required for Registration.load
    {:ok, _} = Recourse.Scraper.start

    course_ids
    |> sections_query
    |> Repo.all
    |> Registration.load
    |> init_variables(pid)
    |> init_constraints(settings, pid)

    Aruspex.find_solution(pid)
    |> Dict.values
  end

  @spec components(Section.t) :: [[Section.t]]
  def components sections do
    g = :digraph.new

    values =
      for section <- sections,
          mt <- section.meeting_times,
          day <- mt.days do
        %{section | meeting_times: [%{mt | days: [day]}]}
        |> add_vertex(g).()
      end

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
    |> Enum.map(fn {grouping, sections} ->
      Aruspex.variable(pid, grouping, sections)
      grouping
    end)
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

    for v <- variables do
      Aruspex.post pid, constraint(
        variables: [v],
        function: &open_seats/1)
    end

    :ok
  end

  defp sections_query course_ids do
    from(s in Section,
      select: s,
      join: c in assoc(s, :course),
      join: mt in assoc(s, :meeting_times),
      where: c.id in ^course_ids,
      where: not(is_nil(mt.start_time) and is_nil(mt.end_time)),
      preload: [meeting_times: [:section], course: :term],
      order_by: c.id)
  end
end
