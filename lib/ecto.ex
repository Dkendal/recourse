defimpl Poison.Encoder, for: Ecto.Date do
  def encode(%Ecto.Date{year: y, month: m, day: d}, _options) do
    %{years: y, months: m, days: d}
    |> Poison.Encoder.encode([])
  end
end

defimpl Poison.Encoder, for: Ecto.Time do
  def encode(%Ecto.Time{hour: h, min: m, sec: s}, _options) do
    %{hours: h, minutes: m, seconds: s}
    |> Poison.Encoder.encode([])
  end
end
