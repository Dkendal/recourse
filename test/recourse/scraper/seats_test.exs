# defmodule Recourse.Scraper.SeatsTest do
#   alias Recourse.Scraper.Seats
#   use Recourse.Case, async: false
# 
#   setup do
#     :ok = Ecto.Adapters.SQL.Sandbox.checkout(Recourse.Repo)
#   end
# 
#   test "find/1 returns seat info for a section" do
#     term = build(:term, year: 2016, semester: :spring)
# 
#     course = create(:course, term: term)
# 
#     section = create(:section, crn: "20765", course: course )
# 
#     use_cassette "seats for 20765" do
#       actual = Seats.find(section)
#       assert actual == %{
#         seats: %{
#           capacity: 10,
#           actual: 10,
#           remaining: 0
#         },
#         waitlist: %{
#           capacity: 100,
#           actual: 2,
#           remaining: 98
#         }
#       }
#     end
#   end
# 
#   test "find/1 returns the section with no info when crn is invalid" do
#     made_up_section = create(:section, crn: "")
# 
#     use_cassette "seats for invalid crn" do
#       assert_attributes Seats.find(made_up_section),
#         seats: :error,
#         waitlist: :error
#     end
#   end
# end
