defmodule Recourse.Scraper do
  use HTTPoison.Base
  require Logger

  def process_url(path) do
    path = case path do
      "courses" <> q ->
        "bwckctlg.p_display_courses" <> q

      "sections" <> q ->
        "bwckctlg.p_disp_listcrse" <> q

      "seats" <> q ->
        "bwckschd.p_disp_detail_sched" <> q
    end

    "https://www.uvic.ca/BAN2P/" <> path
  end

  def get!(url) do
    Logger.info "#{inspect self} GET #{inspect url}"
    start_timer

    super(url)
  end

  def post!(url, opts) do
    Logger.info "#{inspect self} POST #{inspect url}\n\t#{inspect opts}"
    start_timer

    super(url, opts)
  end

  defp process_status_code(status_code) do
    receive do
      {:timer, t} ->
        milliseconds = :timer.now_diff(:erlang.timestamp, t) / :math.pow(10,4)
        Logger.info "#{inspect self} Received #{status_code} after #{milliseconds}ms"
    after
      0 -> true
    end

    status_code
  end

  def start_timer do
    send self, {:timer, :erlang.timestamp}
  end
end
