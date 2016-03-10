import React from "react";
import TimeMark from "./TimeMark";
import Defs from "./Defs";
import Svg from "./Svg";
import Tick from "./Tick";
import MeetingTime from "./MeetingTime";
import Header from "./Header";
//import  "css/components/Timetable";

const Ticks = ({collection}) => (
  <g>
    { collection.
      filter(x => x.onTheHour).
      map((props) => <Tick key={ props.text } { ...props }/>)
    }
  </g>
);

const MeetingTimes = ({collection, ...rest}) => (
  <g>
    {collection.map(meetingTime => (<MeetingTime { ...meetingTime } />))}
  </g>
);

const TimeMarks = ({collection, ...rest}) => (
  <g>
    {collection.map((props, idx) => <TimeMark key={ idx } { ...props }/>)}
  </g>
);

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
