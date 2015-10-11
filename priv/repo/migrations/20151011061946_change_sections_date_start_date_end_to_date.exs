defmodule Recourse.Repo.Migrations.ChangeSectionsDateStartDateEndToDate do
  use Ecto.Migration

  def change do
    alter table(:sections) do
      remove :date_start
      remove :date_end
      add :date_start, :date
      add :date_end, :date
    end
  end
end
