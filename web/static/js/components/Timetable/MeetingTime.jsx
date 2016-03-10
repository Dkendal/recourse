import React from "react";
// import  "css/components/Timetable/MeetingTime";

const Conflict = (props) => (
  <rect className="MeetingTime-conflict" { ...props } />
);

const rectProps = {
  x: "0",
  y: "0",
  width: "100%",
  height: "100%",
};

const Text = ({ section, ...rest }) => (
  <g fontSize="14" { ...rest }>
    <g>
      <text
        x="50%"
        y="50%"
        dy="-2"
        textAnchor="middle"
      >
        { section.course.subject }
      </text>
    </g>
    <g>
      <text
        x="50%"
        y="50%"
        dy="12"
        textAnchor="middle"
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
