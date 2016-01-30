import React, {Component, PropTypes} from "react";
import moment from "moment";

import "css/components/MeetingTime.scss";

function percent(x) { return `${x}%`; }

const day = ({days: days}) => days[0];

/*
 * SVG text area poly-ish-fill
 * SVG can't fill a rect with text...
*/
const TextArea = ({children, ...rest}) => (
  <switch>
    <foreignObject {...rest}
      requiredExtensions="http://www.w3.org/1999/xhtml">
      {children}
    </foreignObject>
  </switch>
);

const MeetingTime = ({meetingTime, section, colorScale, yScale, xScale}) => {
  const course = section.course;
  const start = moment(meetingTime.time_start);
  const end = moment(meetingTime.time_end);
  const y1 = yScale(start);
  const y2 = yScale(end);
  const [x1, x2] = xScale.invertExtent(day(meetingTime));

  // const width = (right - left) / conflicts;

  const options =  {
    fill:    colorScale(section),
    x:       `${x1}%`,
    y:       `${y1}%`,
    width:   `${x2 - x1}%`,
    height:  `${y2 - y1}%`,
    rx: '5px',
    ry: '5px',
  };

  return(
    <g>
      <rect {...options}/>
      <TextArea {...options} >
        <div>
          {course.subject}
        </div>
        <div>
          {course.number}
        </div>
        <div>
          {section.schedule_type}
        </div>
      </TextArea>
    </g>
  );
}


export default MeetingTime;
