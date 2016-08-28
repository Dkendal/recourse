defmodule RecourseSolver.Solver do
  use GenServer
  @name __MODULE__

  defmodule Call do
    @derive Msgpax.Packer
    defstruct [:method, args: []]
  end

  def start() do
    GenServer.start(__MODULE__, [], name: @name)
  end

  def stop(reason) do
    GenServer.stop(@name, reason)
  end

  def ping do
    GenServer.call(@name, :ping)
  end

  def handle_call(:ping, _from, port) do
    f = %Call{method: :ping}
    val = call_port(port, f)
    {:reply, val, port}
  end

  def call_port(port, msg) do
    encoded_msg = encode(msg)

    send port, {self, {:command, encoded_msg}}

    receive do
      {^port, {:data, data}} ->
        decode(data)
    end
  end

  def init(_args) do
    external_program = "./recourse_solver.sh"
    port = Port.open({:spawn, external_program}, [])
    {:ok, port}
  end

  def decode(x) do
    x
    |> Msgpax.unpack!()
  end

  def encode(x) do
    msg = x
    |> Msgpax.pack!()
    |> IO.iodata_to_binary()

    <<byte_size(msg)>> <> msg
  end
end
