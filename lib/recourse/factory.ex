defmodule Recourse.Factory do
  use ExMachina.Ecto, repo: Recourse.Repo

  def factory(:term) do
    %Recourse.Term{
      year: 2015,
      semester: :winter
    }
  end

  def factory(:course) do
    %Recourse.Course{
      subject: Faker.Lorem.words(1),
      number: sequence(:course_number, &"#{&1}"),
      title: Faker.Lorem.sentence,
      term: build(:term)
    }
  end
end
