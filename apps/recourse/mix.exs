defmodule Recourse.Mixfile do
  use Mix.Project

  def project do
    [
      app: :recourse,
      aliases: aliases,
      build_embedded: Mix.env == :prod,
      build_path: "../../_build",
      compilers: [:gettext] ++ Mix.compilers,
      config_path: "../../config/config.exs",
      deps: deps,
      deps_path: "../../deps",
      elixir: "~> 1.3",
      elixirc_paths: elixirc_paths(Mix.env),
      lockfile: "../../mix.lock",
      start_permanent: Mix.env == :prod,
      version: "0.1.0",
   ]
  end

  # Configuration for the OTP application
  #
  # Type `mix help compile.app` for more information
  def application do
    [
      mod: {Recourse, []},
      applications: applications(Mix.env)
    ]
  end

  def applications(:dev) do
    [
      :ex_machina,
      :reprise,
    ] ++ applications(:all)
  end

  def applications(:test) do
    [
      :ex_machina
    ] ++ applications(:all)
  end

  def applications(_all) do
    [
      :con_cache,
      :cowboy,
      :ecto_enum,
      :floki,
      :gettext,
      :httpoison,
      :jsonapi,
      :logger,
      :postgrex,
    ]
  end

  # Specifies which paths to compile per environment
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(:dev),  do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies
  #
  # Type `mix help deps` for examples and options
  defp deps do
    [
      {:con_cache, "~> 0.9.0"},
      {:cowboy, "~> 1.0"},
      {:credo, "~> 0.4", only: [:dev, :test]},
      {:dialyze, "~> 0.2", only: :dev},
      {:ecto, "~> 2.1.0-rc.1", override: true},
      {:ecto_enum, "~> 0.4"},
      {:ex_machina, "~> 1.0", only: [:dev, :test]},
      {:exrm, "~> 1.0"},
      {:exvcr, "~> 0.6", only: [:test, :dev]},
      {:faker, "~> 0.5", only: [:test, :dev]},
      {:floki, "~> 0.10"},
      {:gettext, "~> 0.11"},
      {:httpoison, "~> 0.9"},
      {:jsonapi, "~> 0.1"},
      {:msgpax, "~> 1.0.0"},
      {:postgrex, "~> 0.11"},
      {:reprise, "~> 0.5", only: :dev},
    ]
  end

  defp aliases do
    [
      "test": ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
