import Time from "time-js";
import React, {Component} from "react";

function toPercent(time) {
  const {hr, min, _sec} =
    String.split(time, ":").
    map(t => Number.parseInt(t, 10));

  return (hr + min / 60) / 24;
}

class ScheduleSection extends Component {
  render() {
    const sectionStyle = {
    };

    return (
      <div
        style={sectionStyle}
        >
        <span>{this.props.section.course.subject}</span>
        <span>{this.props.section.course.number}</span>
        <span>{this.props.section.time_start}</span>
        <span>{this.props.section.time_end}</span>
      </div>
    );
  }
}
ScheduleSection.displayName = "ScheduleSection";
export default ScheduleSection;
