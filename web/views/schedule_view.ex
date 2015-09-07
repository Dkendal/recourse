defmodule Recourse.ScheduleView do
alias Recourse.ScheduleView
  use Recourse.Web, :view

  def render("index.json", %{sections: sections}) do
    %{data: sections}
  end
end
