defmodule Recourse.Scraper do
  use HTTPoison.Base

  def process_url(url) do
    "https://www.uvic.ca/BAN2P/"
    <> case url do
      "courses?" <> q ->
        "bwckctlg.p_display_courses?" <> q

      "sections?" <> q ->
        "bwckctlg.p_disp_listcrse?" <> q

      "seats" <> q ->
        "bwckschd.p_disp_detail_sched" <> q
    end
  end
end
