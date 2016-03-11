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
        <tspan>{ ' - ' }</tspan>
        <tspan>{ section.name }</tspan>
      </text>
    </g>
  </g>
);

const iconName = (section) => `MeetingTime-icon icon-${section.schedule_type.toLowerCase()}`;

const MeetingTime = ({section, inConflict, onClick, ...rest}) => (
  <g onClick={ () => onClick(section.id) }>
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
      <g>
        <title>
          { section.schedule_type }
        </title>
        <foreignObject
          width="100%"
          height="100%"
          requiredExtensions="http://www.w3.org/1999/xhtml">
          <i className={ iconName(section) }/>
        </foreignObject>
      </g>
    </svg>
  </g>
);

export default MeetingTime;
