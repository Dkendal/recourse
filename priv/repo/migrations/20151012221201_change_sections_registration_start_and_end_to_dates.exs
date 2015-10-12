defmodule Recourse.Repo.Migrations.ChangeSectionsRegistrationStartAndEndToDates do
  use Ecto.Migration

  def change do
    alter table(:sections) do
      remove :registration_start
      remove :registration_end
      add :registration_start, :date
      add :registration_end, :date
    end
  end
end
