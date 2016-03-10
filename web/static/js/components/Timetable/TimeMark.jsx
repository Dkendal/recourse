import React from "react";
import  "css/components/Timetable/TimeMark";

const TimeMark = (({ text, halfPast, onTheHour, noon, ...tick }) => (
  <line
    key={ text }
    className={[
      'TimeMark',
      halfPast ? 'half-past' : '',
      onTheHour ? 'on-the-hour' : '',
      noon ? 'noon' : '',
    ].join(' ')}
    { ...tick }
  />
));

export default TimeMark;
