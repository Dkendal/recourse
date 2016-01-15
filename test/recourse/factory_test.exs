defmodule DummyFactory do
  use ExMachina.Ecto, repo: Recourse.Repo
  import Recourse.Factory

  def factory(:dummy) do
    %{
      foo: 1,
      bar: &(&1.foo + 10),
      boo: &(&1.bar + 10)
    }
  end
end

defmodule Recourse.FactoryTest do
  use Recourse.Case
  import DummyFactory

  test "lazy factories evaluate" do
    assert lazy(DummyFactory.build(:dummy)) == %{
      foo: 1,
      bar: 11,
      boo: 21
    }
  end
end
