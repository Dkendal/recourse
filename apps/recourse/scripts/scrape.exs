defmodule Scrape do
  alias Recourse.{
    Repo,
    Course,
    Section,
    MeetingTime,
    Term,
  }

  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

  import Repo
  import Ecto.Query, only: [from: 2]

  def subjects do
    ~w(AGEI ASL ANTH ART AE ASTR BIOC BCMB BIOL BME BUS CS CHEM CYC CIVE COM CD
    CENG CSC CW CH CSPT EDCI DHUM DSST DR EOS ECON ED-D EDUC ELEC ENGR ENGL ENT
    ER ES EUS EPHE FA FORB FRAN GEOG GMST GS GREE GRS HINF HLTH HSTR HA HDCC
    HSD HUMA IED IGOV INGH IS IET INTD IB INTS ITAL LATI LAS LAW LING MGB MBA
    MATH MECH MEDS MEDI MICR MUS NRSC NUED NURS NURA NUNP NUHI PAAS PHIL PHYS
    POLI PSYC ADMN PHSP RS SMGT SLST SDH SJS SOCW SOCI SENG SPAN STAT SPP ED-P
    TS THEA WS WKEX WRIT)
  end

  def reset do
    delete_all Recourse.MeetingTime
    delete_all Recourse.Section
    delete_all Recourse.Course
    delete_all Recourse.Term
  end

  def run(year, semester) do
    use_cassette "#{year}-#{semester}", match_requests_on: [:query] do

      { year, "" } = Integer.parse(year)
      semester = String.to_atom(semester)

      term = %Recourse.Term{year: year, semester: semester} |> insert!

      courses = Recourse.Scraper.Course.all(%{
        term: term,
        subjects: subjects,
        number_start: "0",
        number_end: "500"})
      |> Enum.map(fn course ->
        course
        |> insert!
        |> preload([:term])
      end)

      Recourse.Scraper.Section.all(courses)
      |> Enum.map(&insert!/1)
    end
  end

  def set_tba_sections do
    from(s in Section, preload: [:meeting_times])
    |> all
    |> Enum.map(fn section ->
      section
      |> Ecto.Changeset.change
      |> Section.put_tba_change
      |> update!
    end)
  end

  def set_tba_courses do
    from(c in Course, preload: [:sections])
    |> all
    |> Enum.map(fn course ->
      course
      |> Ecto.Changeset.change
      |> Course.put_tba_change
      |> update!
    end)
  end
end

# Scrape.run
{ opts, _, _ } = OptionParser.parse(System.argv())

if opts[:reset] do
  Scrape.reset
end

if opts[:seed] do
  Scrape.run(opts[:year], opts[:semester])
end

if opts[:update_tba] do
  Scrape.set_tba_sections
  Scrape.set_tba_courses
end
