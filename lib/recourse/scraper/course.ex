defmodule Recourse.Scraper.Course do
  import Recourse.Scraper
  import Enum, only: [map: 2]
  import String, only: [split: 2]
  import Floki, only: [find: 2, text: 1]

  alias Recourse.{Course, Term}

  @type opts :: %{
    term: Term.t,
    subjects: [binary],
    number_start: binary,
    number_end: binary
  }

  @type course_params :: %{
    number: binary,
    subject: binary,
    term_id: number,
    title: binary
  }

  @doc "Returns a list of courses from UVic's calendar."
  @spec all(opts) :: Ecto.Changset.t
  def all(args) do
    args
    |> params
    |> http_get
    |> Map.fetch!(:body)
    |> find(".nttitle a")
    |> map(&extract_course(&1, args.term))
  end

  @spec parse(binary) :: course_params
  def parse(text) do
    text
    |> split([" ", " - "])
    |> case do
      [subject, number | title] ->
        %{number: number,
          subject: subject,
          term_id: nil,
          title: Enum.join(title, " ")
        }
    end
  end

  defp http_get(query) do
    get!(
      "courses?" <> URI.encode_query(query),
      [],
      [timeout: :infinity, recv_timeout: :infinity])
  end

  @spec extract_course(Floki.html_tree, Term.t) :: Ecto.ChangeSet.t
  defp extract_course(dom, term) do
    attrs =
      dom
      |> text
      |> parse
      |> Map.put(:term_id, term.id)

    Course.changeset(%Course{}, attrs)
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
