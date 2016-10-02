defimpl Msgpax.Packer, for: Time do
  def pack(time) do
    @protocol.pack :calendar.time_to_seconds Time.to_erl time
  end
end
