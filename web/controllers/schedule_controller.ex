defmodule Recourse.ScheduleController do
  use Recourse.Web, :controller

  def index(conn, %{"course_ids" => course_ids}) do
    sections = Recourse.Schedule.build(course_ids)
    render(conn, "index.json", sections: sections)
  end

end
