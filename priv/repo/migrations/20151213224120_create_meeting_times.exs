defmodule Recourse.Repo.Migrations.CreateMeetingTimes do
  use Ecto.Migration

  def change do
    create table(:meeting_times) do
      add :date_end, :date, null: false
      add :date_start, :date, null: false
      add :days, {:array, :string}, null: false
      add :instructors, {:array, :string}, null: false
      add :location, :string, null: false
      add :end_time, :time
      add :start_time, :time
      add :type, :string, null: false
      add :section_id, references(:sections)

      timestamps
    end

    create index(:meeting_times, [:section_id])
  end
end
