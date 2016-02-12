defmodule Recourse.Repo.Migrations.CreateSection do
  use Ecto.Migration

  def change do
    create table(:sections) do
      add :campus, :string
      add :credits, :float
      add :crn, :string
      add :date_start, :date
      add :date_end, :date
      add :days, {:array, :string}
      add :instructional_method, :string
      add :name, :string
      add :registration_start, :date
      add :registration_end, :date
      add :schedule_type, :string
      add :course_id, references(:courses)

      timestamps
    end
    create index(:sections, [:course_id])

  end
end
