import React, {Component, PropTypes} from "react";

function color({subject, number}) {
  const c = 30; // just an arbirary constant
  const str = `${subject}${number}`;
  const hue = str.
    split("").
    map(x => x.charCodeAt(0)).
    reduce((x, y) => (x + y * c) % 360);

  return `hsl(${hue}, 60%, 60%)`;
}

function toPercent(t, startHr, endHr) {
  const [hr, min] = t.
    split(":").
    map(x => Number.parseInt(x, 10));

  const scale = endHr - startHr;

  return (hr + min / 60 - startHr) / (scale) * 100;
}

export default class ScheduleSection extends Component {
  render() {
    const {
      endHr,
      section,
      startHr
    } = this.props;
    const course = section.course;

    const top = toPercent(section.time_start, startHr, endHr);
    const bottom = 100 - toPercent(section.time_end, startHr, endHr);

    const sectionStyle = {
      background: color(section.course),
      top: `${top}%`,
      bottom: `${bottom}%`
    };

    const className =
      (day) => [
        "schedule-section",
        "schedule-day-" + day
      ].
      join(" ");

    return (
      <div className="schedule-sections">
        {
          section.days.map(
            day =>
            <div
              className={className(day)}
              key={day}
              style={sectionStyle}
            >
              <div>{`${course.subject} ${course.number}`}</div>
              <div>{`[${section.schedule_type}]`}</div>
            </div>
          )
        }
      </div>
    );
  }
}

ScheduleSection.displayName = "ScheduleSection";

ScheduleSection.propTypes = {
};
