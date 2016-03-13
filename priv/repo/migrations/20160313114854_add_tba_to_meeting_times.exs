defmodule Recourse.Repo.Migrations.AddTbaToMeetingTimes do
  use Ecto.Migration

  def change do
    alter table(:meeting_times) do
      add :tba, :bool, null: false, default: false
    end
  end
end
