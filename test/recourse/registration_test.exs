defmodule Recourse.RegistrationTest do
  use Recourse.Case, async: false

  setup do
    Supervisor.terminate_child(Recourse.Supervisor, ConCache)
    Supervisor.restart_child(Recourse.Supervisor, ConCache)
    :ok
  end

  test "loads all the seat info for each section" do
    math = build(:section, registration_code: "20754")
    expected = %{
      seats: %{
        capacity: 10,
        actual: 8,
        remaining: 2
      },
      waitlist: %{
        capacity: 0,
        actual: 0,
        remaining: 0
      }
    }

    use_cassette "seats for 20754" do
      [section] = Recourse.Registration.load([math])

      assert_attributes math, section
      assert expected.seats == section.seats
      assert expected.waitlist == section.waitlist
      assert expected == ConCache.get(:seats, {"20754", "201501"})
    end
  end
end
