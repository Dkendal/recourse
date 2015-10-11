defmodule Recourse.Repo.Migrations.ChangeTerms do
  use Ecto.Migration

  def up do
    alter table(:terms) do
      remove :name
      remove :start
      remove :end
      add :year, :integer
      add :semester, :integer
    end

    create index(:terms, [:year, :semester])
  end

  def down do
    alter table(:terms) do
      add :name, :string
      add :start, :date
      add :end, :date
      remove :year
      remove :semester
    end
  end
end
