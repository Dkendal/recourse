defmodule Recourse.ScheduleController do
  use Recourse.Web, :controller

  def index(conn, _params) do
    schedule = %{}
    render(conn, "index.json", schedule: schedule)
  end
end
