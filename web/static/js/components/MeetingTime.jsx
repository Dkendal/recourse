import React, {PropTypes} from "react";
import moment from "moment";
import {MEETING_TIME, SECTION} from "types";

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

const MeetingTime = ({meetingTime, section, colorScale, yScale, xScale, conflicts, idx}) => {
  const course = section.course;
  const start = moment(meetingTime.start_time);
  const end = moment(meetingTime.end_time);
  const y1 = yScale(start);
  const y2 = yScale(end);
  const [x1, x2] = xScale.invertExtent(day(meetingTime));
  const width = (x2 - x1) / conflicts;
  const hasConflict = conflicts > 1;

  const options =  {
    fill:    colorScale(section),
    x:       `${x1 + idx * width}%`,
    y:       `${y1}%`,
    width:   `${width}%`,
    height:  `${y2 - y1}%`,
    rx: '5px',
    ry: '5px',
  };

  return(
    <g className="MeetingTime">
      <rect {...options} />
      { hasConflict ?  <rect {...options} className="MeetingTime-conflict" /> :
        null
      }
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

const sectionType = PropTypes.shape({
});

MeetingTime.propTypes = {
  meetingTime:  MEETING_TIME.isRequired,
  section:      SECTION.isRequired,
  colorScale:   PropTypes.func.isRequired,
  yScale:       PropTypes.func.isRequired,
  xScale:       PropTypes.func.isRequired,
  conflicts:    PropTypes.number.isRequired,
  idx:          PropTypes.number.isRequired,
}

export default MeetingTime;
