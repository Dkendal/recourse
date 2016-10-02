defmodule Frontend.PageControllerTest do
  use Frontend.Web, :aliases
  use Frontend.ConnCase

  describe"GET index" do
    setup [:seed, :index]

    test "responsed with 200", %{conn: conn} do
      assert html_response(conn, 200) =~ "body"
    end

    test "assigns terms", %{conn: conn} do
      assert [%Term{year: 2020, semester: :fall}] = conn.assigns[:terms]
    end
  end

  def index c do
    conn = get c.conn, "/"
    %{c | conn: conn}
  end

  def seed c do
    {:ok, _} = Repo.insert %Term{
      year: 2020,
      semester: :fall,
      courses: [
        %Course{
          subject: "CSC",
          number: "100",
          sections: [
            %Section{
              name: "A01",
              meeting_times: [
                %MeetingTime{
                  days: ["M"],
                  date_end: ~D[2021-04-25],
                  date_start: ~D[2020-09-05],
                  start_time: ~T[12:00:00],
                  end_time: ~T[14:00:00]
                }]}]}]}
      c
  end
end
