defmodule Recourse.Scraper.Section.Request do
  alias Recourse.Course
  import Recourse.Scraper

  @type uri :: String.t
  @type html :: String.t
  @type query_plan :: [{[Course.t], uri}]

  @spec to_params([Course.t], String.t) :: String.t
  def to_params([%Course{number: number, subject: subject, term: term}], _subject) do
    %{
      crse_in: number,
      schd_in: "",
      subj_in: subject,
      term_in: to_string(term) }
    |> URI.encode_query
  end

  def to_params(courses, subject) do
    # fail if all the terms aren't the same
    [{term, _courses}] = courses |> Enum.group_by(& &1.term) |> Map.to_list

    %{
      crse_in: "%",
      schd_in: "",
      subj_in: subject,
      term_in: to_string(term) }
    |> URI.encode_query
  end

  @doc """
  Given a list of courses it returns a list of uri's to query that will contain
  the sections for a the most number of courses.
  """
  @spec query_plan([Course.t]) :: query_plan
  def query_plan(courses) do
    courses
    |> Enum.group_by(& &1.subject)
    |> Enum.map(fn {subject, courses} ->
      {courses, "sections?" <> to_params(courses, subject)}
    end)
  end

  @doc """
  Execute the query plan, and return all html docs grouped to coresponding
  courses.
  """
  @spec execute(query_plan) :: [{[Course.t], html}]
  def execute(plan) do
    for {courses, uri} <- plan, do: {courses, get!(uri)}
  end
end
