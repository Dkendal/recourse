defmodule Recourse.Repo.Migrations.CreateSection do
  use Ecto.Migration

  def change do
    create table(:sections) do
      add :registration_code, :string
      add :schedule_type, :string
      add :start_time, :time
      add :end_time, :time
      add :days, {:array, :string}
      add :location, :string
      add :date_start, :string
      add :date_end, :string
      add :registration_start, :string
      add :registration_end, :string
      add :campus, :string
      add :credits, :decimal
      add :instructional_method, :string
      add :course_id, references(:courses)
      add :term_id, references(:terms)

      timestamps
    end
    create index(:sections, [:course_id])
    create index(:sections, [:term_id])

  end
end
