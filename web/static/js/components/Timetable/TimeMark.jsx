import React from "react";
import  "css/components/Timetable/TimeMark";

const TimeMark = (({ text, halfPast, onTheHour, noon, ...tick }) => (
  <g key={ text }>
    <title>{ text }</title>
    <line
      strokeWidth="20px"
      stroke="white"
      strokeOpacity="0"
      { ...tick }
    />
    <line
      className={[
        'TimeMark',
        halfPast ? 'half-past' : '',
        onTheHour ? 'on-the-hour' : '',
        noon ? 'noon' : '',
      ].join(' ')}
      { ...tick }
    />
  </g>
));

export default TimeMark;
