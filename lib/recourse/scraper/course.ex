defmodule Recourse.Scraper.Course do
  import Recourse.Scraper
  import Enum, only: [map: 2]
  import String, only: [split: 2]
  import Floki, only: [find: 2, text: 1]

  alias Recourse.Course

  @doc "Returns a list of courses from UVic's calendar."
  def all(args) do
    args
    |> params
    |> http_get
    |> case do
      resp -> resp.body
    end
    |> find(".nttitle a")
    |> map fn course ->
      course
      |> text
      |> parse
      |> struct(term_id: args.term.id)
    end
  end

  def parse(text) do
    text
    |> split([" ", " - "])
    |> case do
      [subject, number | title] ->
        %Course{
          subject: subject,
          number: number,
          title: Enum.join(title, " ")
        }
    end
  end

  defp http_get(query) do
    get!("courses?" <> URI.encode_query query)
  end

  defp params(args) do
    Enum.concat(
      [ term_in: to_string(args.term),
        sel_subj: "",
        sel_levl: "",
        sel_schd: "",
        sel_coll: "",
        sel_divs: "",
        sel_dept: "",
        sel_attr: "",
        sel_crse_strt: args.number_start,
        sel_crse_end: args.number_end
      ],
      Enum.flat_map(
        args.subjects,
        & [sel_subj: &1]))
  end
end
