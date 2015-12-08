defmodule Recourse.Case do
  use ExUnit.CaseTemplate

  using do
    quote do
      use Recourse.Assertions
      use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney
      import Recourse.Factory
    end
  end
end
