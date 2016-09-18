defmodule RecourseSolver.Mixfile do
  use Mix.Project

  def project do
    [
     aliases: aliases,
     app: :recourse_solver,
     build_embedded: Mix.env == :prod,
     build_path: "../../_build",
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
  # Type "mix help compile.app" for more information
  def application do
    [applications: [:logger, :recourse],
     mod: {RecourseSolver, []}]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # To depend on another app inside the umbrella:
  #
  #   {:myapp, in_umbrella: true}
  #
  # Type "mix help deps" for more examples and options
  defp deps do
    [
      {:recourse, in_umbrella: true},
      {:msgpax, "~> 1.0.0"}
    ]
  end

  # Specifies which paths to compile per environment
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(:dev),  do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  defp aliases do
    []
  end
end
