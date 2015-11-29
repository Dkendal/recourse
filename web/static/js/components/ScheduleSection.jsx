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

function style({section: {time_start, time_end, course}, startHr, endHr}) {
  const top = toPercent(time_start, startHr, endHr);
  const bottom = 100 - toPercent(time_end, startHr, endHr);

  return {
    background: color(course),
    top: `${top}%`,
    bottom: `${bottom}%`
  };
}

export default class ScheduleSection extends Component {
  render() {
    const {
      section: {
        days,
        schedule_type,
        course: {
          subject,
          number
        }
      }
    } = this.props;

    const className =
      (day) => [
        "schedule-section",
        "schedule-day-" + day
      ].
      join(" ");

    return (
      <div className="schedule-sections">
        {
          days.map(
            day =>
            <div
              className={className(day)}
              key={day}
              style={style(this.props)}
            >
              <div>{`${subject} ${number}`}</div>
              <div>{`[${schedule_type}]`}</div>
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
