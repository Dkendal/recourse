defmodule SeatsHelper do
  def mock_registration_info do
    :meck.new Recourse.Registration, [:passthrough]

    :meck.expect Recourse.Registration, :load, fn sections ->
      t = %{
        capacity: 999,
        actual: 0,
        remaining: 999
      }

      Enum.map sections, fn section ->
        %{section | seats: t, waitlist: t}
      end
    end
  end
end
