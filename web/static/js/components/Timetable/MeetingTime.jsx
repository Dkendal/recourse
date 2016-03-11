import React from "react";
import  "css/components/Timetable/MeetingTime";

const Conflict = (props) => (
  <rect className="MeetingTime-conflict" { ...props } />
);

const rectProps = {
  x: "0",
  y: "0",
  width: "100%",
  height: "100%",
};

const textProps = {
  is: true,
  x: "50%",
  y: "50%",
  "text-anchor": "middle",
};

const Text = ({ section, ...rest }) => (
  <g fontSize="14" { ...rest }>
    <g>
      <text
        { ...textProps }
      >
        { section.course.subject }
      </text>
    </g>
    <g>
      <text
        dominant-baseline="text-before-edge"
        { ...textProps }
      >
        <tspan>{ section.course.number }</tspan>
      </text>
    </g>
  </g>
);

const MeetingTime = ({section, inConflict, ...rest}) => (
  <g>
    <svg
      x={ rest.x }
      y={ rest.y }
      width={ rest.width }
      height={ rest.height }
    >
      <rect
        fill={ rest.fill }
        { ...rectProps }
      />
      { inConflict ? <Conflict fill={ rest.fill } { ...rectProps }/> : null }
      { inConflict ? <Text
        section={section}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeWidth="5"
        stroke={ rest.fill } />
      : null }
      <Text section={section}/>
    </svg>
  </g>
);

export default MeetingTime;
