defmodule Recourse.Mixfile do
  use Mix.Project

  def project do
    [app: :recourse,
     version: "0.0.1",
     elixir: "~> 1.1",
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
    [mod: {Recourse, []},
     applications: [:phoenix, :phoenix_html, :cowboy, :logger,
                    :phoenix_ecto, :postgrex]]
  end

  # Specifies which paths to compile per environment
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies
  #
  # Type `mix help deps` for examples and options
  defp deps do
    [ {:phoenix, "~> 1.0.1"},
      {:phoenix_html, "~> 2.1"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},

      # database
      {:postgrex, ">= 0.0.0"},
      {:phoenix_ecto, "~> 1.1"},
      {:ecto_enum, "~> 0.3"},

      {:cowboy, "~> 1.0"},

      # parsing html
      {:floki, "~> 0.6.0"},
      {:httpoison, "~> 0.7"},

      # date and time
      {:timex, "~> 0.19"},

      {:apex, only: [:dev, :test]},

      {:dialyze, "~> 0.2.0"},
      {:credo, "~> 0.1.9", only: [:dev, :test]},
      {:aruspex, github: "dkendal/aruspex", branch: "master"}]
  end
end
