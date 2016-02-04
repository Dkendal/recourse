defmodule Recourse.Scraper.Section.Request do
  alias Recourse.Course

  @spec to_params(Course.t) :: String.t
  def to_params(%Course{number: number, subject: subject, term: term}) do
    %{
      crse_in: number,
      schd_in: "",
      subj_in: subject,
      term_in: to_string(term) }
    |> URI.encode_query
  end
end
