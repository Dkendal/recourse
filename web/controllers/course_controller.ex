defmodule Recourse.CourseController do
  alias Recourse.Course
  use Recourse.Web, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
