import React from "react";
// import  "css/components/Timetable/MeetingTime";

const Conflict = (props) => (
  <rect className="MeetingTime-conflict" { ...props } />
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
        x="0"
        y="0"
        width="100%"
        height="100%"
      />
      <g fontSize="14">
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
    </svg>

    { inConflict ?  <Conflict { ...rest } /> : null }
  </g>
);

export default MeetingTime;
