defmodule Blacksmith.Config do
  def save({:ok, record}), do: record

  def save({:error, record}) do
    record.errors
    |> Enum.map(fn {k, v} ->
      "#{k}: #{v}"
    end)
    |> Enum.join("\n")
    |> raise
  end

  def save(model) do
    params =
      Map.drop(model, [:__meta__, :__struct__])
      |> Enum.reject(fn
        {_, %Ecto.Association.NotLoaded{}} -> true
        _ -> false
      end)
      |> Enum.into %{}

    s = struct(model.__struct__)

    changeset = model.__struct__.changeset(s, params)

    save Recourse.Repo.insert(changeset)
  end

  def save_all(list) do
    Enum.map list, &save/1
  end
end
