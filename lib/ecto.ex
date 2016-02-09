defimpl Poison.Encoder, for: Ecto.Date do
  def encode(%Ecto.Date{year: y, month: m, day: d}, _options) do
    %{years: y, months: m, days: d, "$type": "date"}
    |> Poison.Encoder.encode([])
  end
end
