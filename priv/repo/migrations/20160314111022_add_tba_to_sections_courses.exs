defmodule Recourse.Repo.Migrations.AddTbaToSectionsCourses do
  use Ecto.Migration

  def change do
    alter table(:courses) do
      add :tba, :bool, null: false, default: false
    end

    alter table(:sections) do
      add :tba, :bool, null: false, default: false
    end
  end
end
