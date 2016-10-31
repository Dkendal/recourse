defimpl Msgpax.Packer, for: Date do
  def pack(time) do
    time
    |> Date.to_erl
    |> :calendar.date_to_gregorian_days
    |> @protocol.pack
  end
end

defimpl Msgpax.Packer, for: Time do
  def pack(time) do
    time
    |> Time.to_erl
    |> :calendar.time_to_seconds
    |> @protocol.pack
  end
end
