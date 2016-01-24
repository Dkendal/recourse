defmodule Recourse.Mixfile do
  use Mix.Project

  def project do
    [app: :recourse,
     version: "0.0.1",
     elixir: "~> 1.2",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix] ++ Mix.compilers,
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

  def applications(:test) do
    [
      :ex_machina
    ] ++ applications(:all)
  end

  def applications(_all) do
    [
      :con_cache,
      :cowboy,
      :logger,
      :phoenix,
      :phoenix_ecto,
      :phoenix_html,
      :postgrex
    ]
  end

  # Specifies which paths to compile per environment
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies
  #
  # Type `mix help deps` for examples and options
  defp deps do
    [
      {:phoenix, "~> 1.0"},
      {:phoenix_html, "~> 2.1"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:aruspex, git: "https://github.com/Dkendal/aruspex", ref: "76116af"},
      {:con_cache, "~> 0.9.0"},

      # database
      {:postgrex, ">= 0.0.0"},
      {:ecto, "~> 1.1"},
      {:phoenix_ecto, "~> 1.1"},
      {:ecto_enum, "~> 0.3"},

      {:cowboy, "~> 1.0"},

      # parsing html
      {:floki, "~> 0.6.0"},
      {:httpoison, "~> 0.8"},

      # date and time
      {:timex, "~> 0.19"},
      {:qdate, github: "choptastic/qdate"},
      {:erlware_commons, "~> 0.15.0", override: true},

      # deployment
      {:exrm, "~> 1.0.0-rc7"},

      # testing
      {:ex_machina, "~> 0.6", only: [:dev, :test]},
      {:faker, "~> 0.5", only: [:test, :dev]},
      {:exvcr, "~> 0.6", only: :test},
      {:ex_spec, "~> 1.0", only: :test},

      {:dialyze, "~> 0.2.0", only: :dev},
      {:credo, "~> 0.1.9", only: [:dev, :test]},
    ]
  end
end
