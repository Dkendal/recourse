defmodule Recourse.Course do
  use Recourse.Web, :model

  schema "courses" do
    field :title, :string
    field :subject, :string
    field :number, :string
    field :tba, :boolean, default: false
    has_many :sections, Recourse.Section
    belongs_to :term, Recourse.Term

    timestamps
  end

  @type t :: %__MODULE__{}

  @required_fields [
    :title,
    :subject,
    :number,
    :term_id,
    :tba,
  ]

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
  end

  def tba?(%__MODULE__{sections: sections}) do
    Enum.all?(sections, & &1.tba)
  end

  def put_tba_change(change) do
    change
    |> Ecto.Changeset.put_change(:tba, tba?(change.data))
  end

  defmacrop to_tsvector(x) do
    quote do
      fragment("to_tsvector(?)", unquote(x))
    end
  end

  defmacrop concat([x]) do
    quote do
      unquote(x)
    end
  end

  defmacrop concat([x | t]) do
    quote do
      fragment("? || ?", unquote(x), concat(unquote(t)))
    end
  end

  def search(query, search_string) do
    search_string = "%" <> search_string <> "%"

    from c in query,
    where: ilike(concat([
                 c.subject,
                 " ",
                 c.number,
                 " ",
                 c.title
               ]),
      ^search_string
    )
  end
end
