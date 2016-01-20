import React, {Component, PropTypes} from "react";
import moment from "moment";

import "css/components/MeetingTime.scss";

class MeetingTime extends Component {
  xScale() { return this.props.xScale; }

  yScale() { return this.props.yScale; }

  start() { return moment(this.props.time_start); }

  end () { return moment(this.props.time_end); }

  top() { return this.yScale()(this.start()); }

  bottom() { return this.yScale()(this.end()); }

  day() { return this.props.days[0]; }

  xDim() { return this.xScale().invertExtent(this.day()); }

  percent(x) { return `${x}%`; }

  style() {
    const [left, right] = this.xDim();

    return {
      top:     this.percent(this.top()),
      bottom:  this.percent(100 - this.bottom()),
      left:    this.percent(left),
      right:   this.percent(100 - right)
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
            course={course}
            section={this.props}
            {...meeting_time}
            {...this.props}
          />
          )
        }
      </div>
    );
  }
}
