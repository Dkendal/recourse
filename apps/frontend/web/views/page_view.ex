defmodule Frontend.PageView do
  use Frontend.Web, :view

  def term_options(terms) do
    for t <- terms do
      {"#{t.semester} #{t.year}", t.id}
    end
  end
end
