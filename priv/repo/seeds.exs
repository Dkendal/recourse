import Recourse.Factory

Recourse.Repo.delete_all Recourse.Section
Recourse.Repo.delete_all Recourse.Course
Recourse.Repo.delete_all Recourse.Term

term = create :term

# build twenty courses
for _ <- 1..20 do
  course = create :course, term: term

  # 4 lectures each
  for _ <- 1..4 do
    build(:section, course: course)
    |> random_time
    |> as_lecture
    |> create
  end

  # 6 labs each
  for _ <- 1..6 do
    build(:section, course: course)
    |> random_time
    |> as_lab
    |> random_lab_time
    |> create
  end
end
