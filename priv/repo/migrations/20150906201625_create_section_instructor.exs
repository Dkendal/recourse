defmodule Recourse.Repo.Migrations.CreateSectionInstructor do
  use Ecto.Migration

  def change do
    create table(:SectionInstructors) do
      add :section_id, references(:sections), null: false
      add :instructor_id, references(:instructors), null: false

      timestamps
    end
    create index(:SectionInstructors, [:section_id])
    create index(:SectionInstructors, [:instructor_id])

  end
end
