defmodule Recourse.Repo.Migrations.CreateTerm do
  use Ecto.Migration

  def change do
    create table(:terms) do
      add :year, :integer
      add :semester, :integer
      timestamps
    end

  end
end
