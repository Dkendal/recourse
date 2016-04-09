defmodule Recourse.PageController do
  use Recourse.Web, :controller

  def about(conn, _params) do
    render conn, "about.html"
  end

  def index(conn, _params) do
    render conn, "index.html"
  end
end
