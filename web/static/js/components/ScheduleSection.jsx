import React, {Component, PropTypes} from "react";
import {SECTION} from "../types";

function hash(str) {
  return(
    str
      .split("")
      .reduce(
        (a, b) => {
          a = ((a << 5) -a) + b.charCodeAt(0);
          return a & a;
        },
        0
      )
  );
}

function color({subject, number}) {
  const str = `${subject}${number}`;
  const hex = hash(str)
    .toString(16)
    .slice(-6);

  return `#${hex}`;
}

function toPercent(t, startHr, endHr) {
  const [hr, min] = t
    .split(":")
    .map(x => Number.parseInt(x, 10));

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
      ]
      .join(" ");

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
              <span>{section.course.subject}</span>
              <span>{section.course.number}</span>
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
