defmodule Recourse.Repo.Migrations.CreateCourse do
  use Ecto.Migration

  def change do
    create table(:courses) do
      add :title, :string
      add :subject, :string
      add :number, :string
      add :term_id, references(:terms), null: false

      timestamps
    end

  end
end
