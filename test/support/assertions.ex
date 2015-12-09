defmodule Recourse.Assertions do
  defmacro __using__(_opts) do
    quote do
      require unquote(__MODULE__)
      import unquote(__MODULE__)

      def assert_attributes actual, expected do
        keys = Map.keys expected
        Enum.map keys, fn k ->
          Map.fetch!(expected, k) == Map.fetch!(actual, k)
        end
      end

      def assert_valid changeset do
        reason =
          changeset.errors
          |> Enum.map(fn {k, v} ->
            "\t#{k}: #{v}"
          end)

        message =
          ["Expected changeset to be valid, but wasn't."] ++ reason
          |> Enum.join("\n")

        assert(changeset.valid?, message)
      end
    end
  end
end
