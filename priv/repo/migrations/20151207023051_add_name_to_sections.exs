defmodule Recourse.Repo.Migrations.AddNameToSections do
  use Ecto.Migration

  def change do
    alter table(:sections) do
      add :name, :string
    end
  end
end
