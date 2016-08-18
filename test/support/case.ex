defmodule Recourse.Case do
  use ExUnit.CaseTemplate

  using do
    quote do
      use Recourse.Assertions
      use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney
    end
  end
end
