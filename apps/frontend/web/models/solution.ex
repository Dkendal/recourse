defmodule Frontend.Solution do
  @moduledoc """
  Used to render the schedule.
  """

  use Frontend.Web, :aliases
  use Frontend.Web, :model
  import Apex.AwesomeDef

  defstruct [
    :solutions,
    :classes,
    :course_ids,
    :section_ids,
    :bound_section_ids,
    :unbound_section_ids
  ]

  defmodule Class do
    @moduledoc """
    Used to render a single 'block' on the schedule.
    """

    defstruct [
      :meeting_time,
      :x,
      :y,
      :height,
      :width,
      :fill,
      :subject,
      :course,
      :section,
      :day]

    @days ~w(M T W R F)
    @saturation 80
    @lightness 70

    def new(meeting_time, day) do
      __MODULE__
      |> struct(meeting_time: meeting_time, day: day)
      |> measure
    end

    def collection(meeting_times, acc \\ [])

    def collection([], acc), do: acc

    def collection(meeting_time = %MeetingTime{}, acc) do
      for day <- meeting_time.days do
        new(meeting_time, day)
      end ++ acc
    end

    def collection([h = %MeetingTime{} | t], acc) do
      collection(t, collection(h, acc))
    end

    def measure(class) do
      %{class|
       x: format_percent(x(class)),
       y: format_percent(y(class)),
       height: format_percent(height(class)),
       width: format_percent(width(class)),
       fill: color(class),
       course: course(class),
       section: section(class),
      }
    end

    def x(class) do
      Enum.find_index(@days, & &1 == class.day) / length(@days) * 100
    end

    def y(class) do
      percent class.meeting_time.start_time
    end

    def y2(class) do
      percent class.meeting_time.end_time
    end

    def height(class) do
      y2(class) - y(class)
    end

    def width(class) do
      1 / length(@days) * 100
    end

    def course(class) do
      class.meeting_time.section.course
    end

    def section(class) do
      class.meeting_time.section
    end

    def format_percent(str), do: "#{str}%"

    def percent(%Time{hour: h, minute: m}) do
      (h + (m / 60)) / 24 * 100
    end

    def sum_codepoints(<<x>>), do: x

    def sum_codepoints(<<x>> <> t) do
      x + sum_codepoints(t)
    end

    def color(class) do
      course = class.meeting_time.section.course

      hue = :math.pow(sum_codepoints(course.subject), 5)
      hue = hue + sum_codepoints(course.number) * 16
      hue = round(hue)
      hue = rem(hue, 255)

      "hsl(#{hue}, #{@saturation}%, #{@lightness}%)"
    end
  end

  def new(solutions) do
    __MODULE__
    |> struct(solutions: solutions)
    |> get_ids
    |> load
  end

  def get_ids(sol) do
    course_ids = Enum.uniq(Enum.map sol.solutions, (& &1.course_id))

    bound_section_ids =
      for s <- sol.solutions,
      s.id != :unbound,
      do: String.to_integer(s.id)

    unbound_section_ids =
      for s <- sol.solutions,
      s.id == :unbound,
      x <- s.ids,
      do: x

    section_ids = bound_section_ids ++ unbound_section_ids

    %{sol |
     course_ids: course_ids,
     bound_section_ids: bound_section_ids,
     unbound_section_ids: unbound_section_ids,
     section_ids: section_ids}
  end

  def load(sol) do
    %{sol | classes: (Class.collection Repo.all query sol)}
  end

  def query(sol) do
    from m in MeetingTime,
    join: s in assoc(m, :section),
    join: c in assoc(s, :course),
    where: s.id in ^sol.section_ids,
    preload: [section: {s, [{:course, c}]}]
  end
end