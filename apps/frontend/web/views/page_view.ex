defmodule Frontend.PageView do
  use Frontend.Web, :view

  def render("periods.html", %{from: from, to: to, step: step}) do
    import Seconds
    interval [from: from, to: to, step: step], fn t ->
      y = t / day * 100
      render "period.html", y: "#{y}%"
    end
  end

  def term_options(terms) do
    for t <- terms do
      {"#{t.semester} #{t.year}", t.id}
    end
  end
end
