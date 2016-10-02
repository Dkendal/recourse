defmodule Frontend.Mixfile do
  use Mix.Project

  def project do
    [
     aliases: aliases(),
     app: :frontend,
     build_embedded: Mix.env == :prod,
     build_path: "../../_build",
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     config_path: "../../config/config.exs",
     deps: deps(),
     deps_path: "../../deps",
     elixir: "~> 1.3",
     elixirc_paths: elixirc_paths(Mix.env),
     lockfile: "../../mix.lock",
     start_permanent: Mix.env == :prod,
     version: "0.0.1",
   ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {Frontend, []},
     applications: [
       :cowboy,
       :gettext,
       :logger,
       :phoenix,
       :phoenix_ecto,
       :phoenix_html,
       :phoenix_pubsub,
       :postgrex,
     ]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:phoenix, "~> 1.2.1"},
     {:phoenix_pubsub, "~> 1.0"},
     {:phoenix_ecto, "~> 3.0"},
     {:ecto, "~> 2.1.0-rc.1", override: true},
     {:postgrex, ">= 0.0.0"},
     {:phoenix_html, "~> 2.6"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:gettext, "~> 0.11"},
     {:cowboy, "~> 1.0"}]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
     "test": ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end
