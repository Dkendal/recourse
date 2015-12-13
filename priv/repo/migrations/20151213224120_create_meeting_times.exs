defmodule Recourse.Repo.Migrations.CreateMeetingTimes do
  use Ecto.Migration

  def change do
    create table(:meeting_times) do
      add :date_end, :date, null: false
      add :date_start, :date, null: false
      add :days, {:array, :string}, null: false
      add :instructors, {:array, :string}, null: false
      add :location, :string, null: false
      add :time_end, :time, null: false
      add :time_start, :time, null: false
      add :type, :string, null: false
      add :section_id, references(:sections)

      timestamps
    end

    create index(:meeting_times, [:section_id])
  end
end
