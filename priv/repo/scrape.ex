defmodule Scrape do
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney
  def run do
    use_cassette "scrape everything", match_requests_on: [:query] do
      import Recourse.Repo

      Mix.Task.run("ecto.drop")
      Mix.Task.run("ecto.create")
      Mix.Task.run("ecto.migrate")

      subjects = ~w(
      AGEI
      ASL
      ANTH
      ART
      AE
      ASTR
      BIOC
      BCMB
      BIOL
      BME
      BUS
      CS
      CHEM
      CYC
      CIVE
      COM
      CD
      CENG
      CSC
      CW
      CH
      CSPT
      EDCI
      DHUM
      DSST
      DR
      EOS
      ECON
      ED-D
      EDUC
      ELEC
      ENGR
      ENGL
      ENT
      ER
      ES
      EUS
      EPHE
      FA
      FORB
      FRAN
      GEOG
      GMST
      GS
      GREE
      GRS
      HINF
      HLTH
      HSTR
      HA
      HDCC
      HSD
      HUMA
      IED
      IGOV
      INGH
      IS
      IET
      INTD
      IB
      INTS
      ITAL
      LATI
      LAS
      LAW
      LING
      MGB
      MBA
      MATH
      MECH
      MEDS
      MEDI
      MICR
      MUS
      NRSC
      NUED
      NURS
      NURA
      NUNP
      NUHI
      PAAS
      PHIL
      PHYS
      POLI
      PSYC
      ADMN
      PHSP
      RS
      SMGT
      SLST
      SDH
      SJS
      SOCW
      SOCI
      SENG
      SPAN
      STAT
      SPP
      ED-P
      TS
      THEA
      WS
      WKEX
      WRIT
      )

      term = %Recourse.Term{year: 2016, semester: :winter} |> insert!

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

Scrape.run
