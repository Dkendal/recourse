defmodule Recourse.Mixfile do
  use Mix.Project

  def project do
    [app: :recourse,
     version: "0.1.0",
     elixir: "~> 1.3.1",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps]
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
      :aruspex,
      :con_cache,
      :cowboy,
      :ecto_enum,
      :exyz,
      :floki,
      :gettext,
      :httpoison,
      :jsonapi,
      :logger,
      :pattern_tap,
      :phoenix,
      :phoenix_ecto,
      :phoenix_html,
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
      {:aruspex, git: "https://github.com/Dkendal/aruspex", ref: "76116af"},
      {:con_cache, "~> 0.9.0"},
      {:cowboy, "~> 1.0"},
      {:credo, "~> 0.4", only: [:dev, :test]},
      {:dialyze, "~> 0.2", only: :dev},
      {:ecto, "~> 2.0.0-beta.2", override: true},
      {:ecto_enum, "~> 0.4"},
      {:ex_machina, "~> 1.0", only: [:dev, :test]},
      {:exrm, "~> 1.0"},
      {:exvcr, "~> 0.6", only: [:test, :dev]},
      {:faker, "~> 0.5", only: [:test, :dev]},
      {:floki, "~> 0.10"},
      {:gettext, "~> 0.11"},
      {:httpoison, "~> 0.9"},
      {:jsonapi, "~> 0.1"},
      {:phoenix, "~> 1.2"},
      {:phoenix_ecto, "~> 3.0" },
      {:phoenix_html, "~> 2.6"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:postgrex, "~> 0.11"},
      {:reprise, "~> 0.5", only: :dev},
    ]
  end
end
