import Time from "time-js";
import React, {Component} from "react";

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

class ScheduleSection extends Component {
  render() {
    const
    { startHr
    , endHr
    , section
    } = this.props;

    const toPercent = (t) => {
      const [hr, min] =
        t
        .split(":")
        .map(x => Number.parseInt(x, 10));

      const scale = endHr - startHr;

      return (hr + min / 60 - startHr) / (scale) * 100;
    };

    const top = toPercent(section.time_start);
    const bottom = 100 - toPercent(section.time_end);

    const sectionStyle =
      { background: color(section.course)
      , top: `${top}%`
      , bottom: `${bottom}%`
      };

    const className =
      (day) =>
      [ "schedule-section"
      , "schedule-day-" + day
      ]
      .join(" ");

    return (
      <div className="schedule-sections">
        {
          section.days.map(
            day =>
            <div
              className={className(day)}
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
export default ScheduleSection;
