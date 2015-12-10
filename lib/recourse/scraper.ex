defmodule Recourse.Scraper do
  use HTTPoison.Base
  require Logger

  def process_url(path) do
    path = case path do
      "courses?" <> q ->
        "bwckctlg.p_display_courses?" <> q

      "sections?" <> q ->
        "bwckctlg.p_disp_listcrse?" <> q

      "seats" <> q ->
        "bwckschd.p_disp_detail_sched" <> q
    end

    "https://www.uvic.ca/BAN2P/" <> path
  end

  def get!(url) do
    Logger.info "#{inspect self} GET #{inspect url}"
    super(url)
  end

  def post!(url, opts) do
    Logger.info "#{inspect self} POST #{inspect url}\n\t#{inspect opts}"
    super(url, opts)
  end

  defp process_status_code(status_code) do
    Logger.info "#{inspect self} Response #{status_code}"
    status_code
  end
end
