defmodule Recourse.Repo.Migrations.DropTermIdFromSections do
  use Ecto.Migration

  def change do
    alter table(:sections) do
      remove :term_id
    end
  end
end
