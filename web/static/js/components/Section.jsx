import React, {Component, PropTypes} from "react";
import moment from "moment";

import "css/components/MeetingTime.scss";

function percent(x) { return `${x}%`; }

class MeetingTime extends Component {
  xScale() { return this.props.xScale; }

  yScale() { return this.props.yScale; }

  start() { return moment(this.props.time_start); }

  end () { return moment(this.props.time_end); }

  top() { return this.yScale()(this.start()); }

  bottom() { return this.yScale()(this.end()); }

  day() { return this.props.days[0]; }

  xDim() { return this.xScale().invertExtent(this.day()); }

  color() { return this.props.colorScale(this.props.section); }

  style() {
    const [left, right] = this.xDim();

    return {
      backgroundColor: this.color(),
      top:             percent(this.top()),
      bottom:          percent(100 - this.bottom()),
      left:            percent(left),
      right:           percent(100 - right)
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
          meetingTime =>
          <MeetingTime
            key={[meetingTime.id, meetingTime.days]}
            course={course}
            section={this.props}
            {...meetingTime}
            {...this.props}
          />
          )
        }
      </div>
    );
  }
}
