defmodule RecourseSolver.Mixfile do
  use Mix.Project

  def project do
    [
     app: :recourse_solver,
     build_embedded: Mix.env == :prod,
     build_path: "../../_build",
     config_path: "../../config/config.exs",
     deps: deps,
     deps_path: "../../deps",
     elixir: "~> 1.3",
     lockfile: "../../mix.lock",
     start_permanent: Mix.env == :prod,
     version: "0.1.0",
   ]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    [applications: [:logger],
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
    [{:msgpax, "~> 1.0.0"}]
  end
end
