import React from "react";
//import  "css/components/Timetable/TimeMark";

const TimeMark = (({ text, halfPast, onTheHour, ...tick }) => (
  <line
    key={ text }
    stroke={ "black" }
    className={[
      halfPast ? 'half-past' : '',
      onTheHour ? 'on-the-hour' : '',
    ].join(' ')}
    { ...tick }
  />
));

export default TimeMark;
