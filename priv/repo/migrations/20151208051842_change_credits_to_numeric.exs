defmodule Recourse.Repo.Migrations.ChangeCreditsToNumeric do
  use Ecto.Migration

  def change do
    alter table(:sections) do
      modify :credits, :float
    end
  end
end
