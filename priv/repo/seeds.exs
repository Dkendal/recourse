import Recourse.Factory

Recourse.Repo.delete_all Recourse.MeetingTime
Recourse.Repo.delete_all Recourse.Section
Recourse.Repo.delete_all Recourse.Course
Recourse.Repo.delete_all Recourse.Term

term = create :term

# build twenty courses
for _ <- 1..20 do
  course = create :course, term: term

  # 4 lectures each
  for _ <- 1..4 do
    mt = build(:meeting_time)
    |> random_time

    build(:section, course: course, meeting_times: [mt])
    |> as_lecture
    |> create
  end

  # 6 labs each
  for _ <- 1..6 do
    mt = build(:meeting_time)
    |> random_lab_time

    build(:section, course: course, meeting_times: [mt])
    |> as_lab
    |> create
  end
end
