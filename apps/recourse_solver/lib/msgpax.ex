defimpl Msgpax.Packer, for: Ecto.Time do
  def pack(time) do
    @protocol.pack :calendar.time_to_seconds Ecto.Time.to_erl time
  end
end
