defmodule Seconds do
  def day, do: 86_400
  def hour, do: 3_600
  def minute, do: 60

  def to_time(seconds) do
    Time.from_erl(:calendar.seconds_to_time(seconds))
  end

  def from_time(time) do
    :calendar.time_to_seconds(Time.to_erl(time))
  end

  def diff(t1 = %Time{}, t2 = %Time{}) do
    from_time(t2) - from_time(t1)
  end

  def interval [from: from, to: to, step: step], f do
    step = from_time(step)
    t1 = round((from_time(from) + step) / step)
    t2 = round((from_time(to) - step) / step)
    (t1..t2)
    |> Stream.map(& &1 * step)
    |> Enum.map(f)
  end
end
