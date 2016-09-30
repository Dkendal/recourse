defmodule Solver.Server do
  use GenServer
  @name __MODULE__
  @script '../pysolver/pysolver.py'

  defmodule Call do
    @derive Msgpax.Packer
    defstruct [:method, args: []]
  end

  def start() do
    GenServer.start(__MODULE__, [], name: @name)
  end

  def stop(reason \\ :normal)
  def stop(reason) do
    GenServer.stop(@name, reason)
  end

  def ping do
    GenServer.call(@name, :ping)
  end

  def solve(sections) do
    GenServer.call(@name, {:solve, sections})
  end

  def handle_call(:ping, _from, port) do
    f = %Call{method: :ping}
    val = call_port(port, f)
    {:reply, val, port}
  end

  def handle_call({:solve, sections}, _from, port) do
    f = %Call{method: :solve, args: [sections]}
    val = call_port(port, f)
    {:reply, val, port}
  end


  def call_port(port, msg) do
    encoded_msg = encode(msg)

    send port, {self, {:command, encoded_msg}}
    send port, {self, {:command, encoded_msg}}

    receive do
      {^port, {:data, data}} ->
        decode(data)
      other ->
        raise other
    end
  end

  def init(_args) do
    port = Port.open({:spawn, @script}, [])
    {:ok, port}
  end

  def terminate(reason, port) do
    Port.close(port)
  end

  def decode(x) do
    Msgpax.unpack!(x)
  end

  def encode(x) do
    msg = x
    |> Msgpax.pack!()
    |> IO.iodata_to_binary()
    <<byte_size(msg) :: size(16)>> <> msg
  end
end
