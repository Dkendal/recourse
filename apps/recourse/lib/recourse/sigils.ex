defmodule Recourse.Sigils do
  defmacro __using__(_) do
    quote do
      require unquote(__MODULE__)
      import unquote(__MODULE__)
    end
  end

  defmacro sigil_d(date, modifiers)
  defmacro sigil_d({:<<>>, _, [string]}, []) do
    Macro.escape(Ecto.Date.cast!(string))
  end

  defmacro sigil_t(date, modifiers)
  defmacro sigil_t({:<<>>, _, [string]}, []) do
    Macro.escape(Ecto.Time.cast!(string))
  end
end
