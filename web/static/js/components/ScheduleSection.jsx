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

function toPercent(t, startHour, endHour) {
  const [hr, min] = t.
    split(":").
    map(x => Number.parseInt(x, 10));

  const scale = endHour - startHour;

  return (hr + min / 60 - startHour) / (scale) * 100;
}

function className({numberOfSections}) {
  let name = "schedule-section";
  if (numberOfSections > 1) {
    name += " schedule-section-conflict";
  }
  return name;
}

function style({section: {time_start, time_end, course}, startHour, endHour, idx, numberOfSections}, day) {
  const days = ["M", "T", "W", "R", "F"];

  const numberOfColumns = days.length + 1;

  const top = toPercent(time_start, startHour, endHour);
  const bottom = 100 - toPercent(time_end, endHour, endHour);

  const width = 1 / numberOfColumns * 100 / numberOfSections;
  const left = (days.indexOf(day) + 1) / numberOfColumns * 100 + width * idx;

  return {
    background: color(course),
    top: `${top}%`,
    bottom: `${bottom}%`,
    left: `${left}%`,
    width: `${width}%`
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

    return (
      <div className="schedule-sections">
        {
          days.map(
            day =>
            <div
              className={className(this.props)}
              key={day}
              style={style(this.props, day)}
            >
              <div className="schedule-section-text">
                {`${subject} ${number}`}
              </div>
              <div className="schedule-section-text">
                {`[${schedule_type}]`}
              </div>
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
