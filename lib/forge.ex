defmodule Forge do
  use Blacksmith

  @save_one_function &Blacksmith.Config.save/1
  @save_all_function &Blacksmith.Config.save_all/1

  register(:term, %Recourse.Term{
    year: 2015,
    semester: :winter
  })

  register(:course, %Recourse.Course{
    subject: Faker.Lorem.words(1),
    number: Sequence.next(:course_number, & "#{&1}"),
    title: Faker.Lorem.sentence
  })
end
