import React, {Component, PropTypes} from "react";
import moment from "moment";
import d3 from "d3";

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

    const minTime = moment({hours: this.props.startHour});
    const maxTime = moment({hours: this.props.endHour});

    const yScale = d3.time.scale()
      .domain([minTime, maxTime])
      .range([0, 100]);

    const days = ["-1", "M", "T", "W", "R", "F", "1"];
    const c = days.length - 1 ;
    const domain = days.map((_, i) => (i + 1)/c * 100);

    const xScale = d3.scale.threshold()
      .domain(domain)
      .range(days);

    return(
      <div>
        { this.props.meeting_times.map(
          meeting_time =>
          <MeetingTime
            xScale={xScale}
            yScale={yScale}
            course={course}
            section={this.props}
            {...meeting_time} />
          )
        }
      </div>
    );
  }
}
