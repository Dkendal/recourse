defmodule Recourse.Term.Form do
  def to_options [] do
    []
  end

  def to_options [h |t] do
    [to_options(h) | to_options(t)]
  end

  def to_options h do
    {presentation(h), h.id}
  end

  def presentation(term) do
    semester = String.capitalize(to_string(term.semester))
    "#{semester} #{term.year}"
  end
end
