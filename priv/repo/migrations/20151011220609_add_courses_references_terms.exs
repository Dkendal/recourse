defmodule Recourse.Repo.Migrations.AddCoursesReferencesTerms do
  use Ecto.Migration

  def change do
    alter table(:courses) do
      add :term_id, references(:terms), null: false
    end
  end
end
