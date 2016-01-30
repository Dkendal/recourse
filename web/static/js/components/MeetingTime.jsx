import React, {Component, PropTypes} from "react";
import moment from "moment";

import "css/components/MeetingTime.scss";

function percent(x) { return `${x}%`; }

const day = ({days: days}) => days[0];

const MeetingTime = ({
  colorScale,
  conflicts,
  course,
  idx,
  meetingTime,
  section,
  xScale,
  yScale,
}) => {
  const start = moment(meetingTime.time_start);
  const end = moment(meetingTime.time_end);
  const top = yScale(start);
  const bottom = yScale(end);

  const [left, right] = xScale.invertExtent(day(meetingTime));

  const width = (right - left) / conflicts;

  const style =  {
    backgroundColor: colorScale(section),
    top:             percent(top),
    bottom:          percent(100 - bottom),
    left:            percent(left + width * idx),
    right:           percent(100 - right),
    width:           percent(width)
  };

  return(
    <div
      className="MeetingTime"
      style={style}>
      <div>
        {course.subject}
      </div>
      <div>
        {course.number}
      </div>
      <div>
        {section.schedule_type}
      </div>
    </div>
  );
}


export default MeetingTime;
