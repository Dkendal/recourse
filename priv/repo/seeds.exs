import Recourse.Factory

term = create :term

for _ <- 1..20 do
  course = build :course, term: term
  create :section, course: course
end
