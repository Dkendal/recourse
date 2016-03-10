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

const TimeMarks = ({collection, ...rest}) => (
  <g>
    {collection.map(({ text, halfPast, onTheHour, ...tick }) => (
      <line
        key={ text }
        stroke={ "black" }
        className={[
          halfPast ? 'half-past' : '',
          onTheHour ? 'on-the-hour' : '',
        ].join(' ')}
        { ...tick }
      />
    ))}
  </g>
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
  <svg
    x="0"
    y="0"
    width="100%"
    height="10%"
  >
    <g>
      { collection.map(({text, ...rest}) => (
        <text
          textAnchor="middle"
          y="50%"
          { ...rest }>
          { text }
        </text>))
      }
    </g>
  </svg>
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
    <Svg
      style={ { flex: 1 } }
    >
      <Defs />
      <Header collection={ props.header }/>
      <Ticks collection={ props.timeMarkers }/>
      <TimeMarks collection={ props.timeMarkers }/>
      <MeetingTimes collection={ props.meetingTimes }/>
    </Svg>
  </div>
);

export default Timetable;
