defmodule Recourse.Repo.Migrations.CreateCourse do
  use Ecto.Migration

  def change do
    create table(:courses) do
      add :title, :string
      add :subject, :string
      add :number, :string
      add :description, :string
      add :requirement, :string

      timestamps
    end

  end
end
