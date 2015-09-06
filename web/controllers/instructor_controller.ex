defmodule Recourse.InstructorController do
  use Recourse.Web, :controller

  alias Recourse.Instructor

  plug :scrub_params, "instructor" when action in [:create, :update]

  def index(conn, _params) do
    instructors = Repo.all(Instructor)
    render(conn, "index.json", instructors: instructors)
  end

  def create(conn, %{"instructor" => instructor_params}) do
    changeset = Instructor.changeset(%Instructor{}, instructor_params)

    case Repo.insert(changeset) do
      {:ok, instructor} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", instructor_path(conn, :show, instructor))
        |> render("show.json", instructor: instructor)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Recourse.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    instructor = Repo.get!(Instructor, id)
    render conn, "show.json", instructor: instructor
  end

  def update(conn, %{"id" => id, "instructor" => instructor_params}) do
    instructor = Repo.get!(Instructor, id)
    changeset = Instructor.changeset(instructor, instructor_params)

    case Repo.update(changeset) do
      {:ok, instructor} ->
        render(conn, "show.json", instructor: instructor)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Recourse.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    instructor = Repo.get!(Instructor, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(instructor)

    send_resp(conn, :no_content, "")
  end
end
