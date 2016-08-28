defmodule RecourseSolver do
  use GenServer

  def start_link() do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def foo(x) do
    GenServer.call(__MODULE__, {:foo, x})
  end

  def handle_call({:foo, x}, _from, port) do
    val = call_port port, {:foo, x}

    {:reply, val, port}
  end

  def call_port(port, msg) do
    send port, {self, {:command, encode(msg)}}

    receive do
      {^port, {:data, data}} ->
        data
    end
  end

  def init(_args) do
    external_program = "./bin/recourse_solver"
    port = Port.open({:spawn, external_program}, [])
    {:ok, port}
  end

  def encode({method, data}) do
    "#{method}:#{data}\n"
  end
end

RecourseSolver.start_link
IO.inspect RecourseSolver.foo(1)
