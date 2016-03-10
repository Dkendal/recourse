import React from "react";
//import  "css/components/Timetable";

const Svg = ({children, ...props}) => (
  <svg
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    { ...props }
  >
    { children }
  </svg>
);

const Defs = () => (
  <defs>
    <pattern
      is
      id="danger-stripes"
      width="10"
      height="10"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
      >
      <rect
        width="3"
        height="10"
        transform="translate(0,0)"
        fill="red"/>
    </pattern>
  </defs>
);

const Ticks = ({collection, ...rest}) => (
  <g>
    {collection.map(({ text, position }) => (
      <text
        key={ text }
        y={ `${position}%` }
        { ...rest }
      >
        { text }
      </text>
    ))}
  </g>
);

const Conflict = (props) => (
  <rect className="MeetingTime-conflict" { ...props } />
);

const MeetingTime = ({section, inConflict, ...rest}) => (
  <g>
    <rect { ...rest } />

    { inConflict ?  <Conflict { ...rest } /> : null }

    <foreignObject
      requiredExtensions="http://www.w3.org/1999/xhtml"
      { ...rest }
    >
      <p>{ section.course.subject }</p>
      <p>{ section.course.number }</p>
    </foreignObject>
  </g>
);

const MeetingTimes = ({collection, ...rest}) => (
  <g>
    {collection.map(meetingTime => (<MeetingTime { ...meetingTime } />))}
  </g>
);

const Header = ({ collection }) => (
  <Svg
    height="1em"
    width="100%"
  >
    { collection.map(({text, ...rest}) => (
      <text
        textAlign="middle"
        y="100%"
        { ...rest }>
        { text }
      </text>))
    }
  </Svg>
)

const Timetable = (props) => (
  <div
    className="Timetable Tile Tile-padded"
    style={ {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    } }
  >
    <Header collection={ props.header }/>
    <Svg
      style={ { flex: 1 } }
    >
      <Defs />
      <Ticks collection={ props.timeMarkers }/>
      <MeetingTimes collection={ props.meetingTimes }/>
    </Svg>
  </div>
);

export default Timetable;
