defmodule Recourse.Repo.Migrations.CreateTerm do
  use Ecto.Migration

  def change do
    create table(:terms) do
      add :name, :string
      add :start, :date
      add :end, :date

      timestamps
    end

  end
end
