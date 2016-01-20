import React, {Component, PropTypes} from "react";
import Time from "lib/time";

import "css/components/MeetingTime.scss";

class MeetingTime extends Component {
  t(time) {
    return Time.timeToNumber(Time.parseTime());
  }

  bottom() {
    const timeEnd = this.t(this.props.time_end);
    return 100 - (timeEnd / this.props.endHour);
  }

  top() {
    const timeStart = this.t(this.props.time_start);
    return timeStart / this.props.startHour;
  }

  style() {
    debugger
    return {
      top: `${this.top()}%`,
      bottom: `${this.bottom()}%`
    };
  }

  render() {
    const {course, section} = this.props;

    return(
      <div className="MeetingTime" style={this.style()}>
        <span> {course.subject} </span>
        <span> {course.number} </span>
        <span> {section.schedule_type} </span>
      </div>
    );
  }
}

export default class Section extends Component {
  render() {
    const {course} = this.props;

    return(
      <div>
        { this.props.meeting_times.map(
          meeting_time =>
          <MeetingTime
            startHour={this.props.startHour}
            endHour={this.props.endHour}
            course={course}
            section={this.props}
            {...meeting_time} />
          )
        }
      </div>
    );
  }
}
