defmodule Recourse.Repo.Migrations.CreateInstructor do
  use Ecto.Migration

  def change do
    create table(:instructors) do
      add :firstname, :string
      add :lastname, :string

      timestamps
    end

  end
end
