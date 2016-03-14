defmodule Scrape do
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

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
    Mix.Task.run("ecto.drop")
    Mix.Task.run("ecto.create")
    Mix.Task.run("ecto.migrate")
  end

  def run(year, semester) do
    use_cassette "#{year}-#{semester}", match_requests_on: [:query] do
      import Recourse.Repo

      { year, "" } = Integer.parse(year)

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
end

# Scrape.run

{ opts, _, _ } = OptionParser.parse(System.argv())

if opts[:reset] do
  Scrape.reset
end

Scrape.run(opts[:year], opts[:semester])
