import React, {Component, PropTypes} from "react";
import _ from "underscore";
import {List} from "immutable";
import moment from "moment";
import Row from "./Row";
import Column from "./Column";
import d3 from "d3";

import MeetingTime from "./MeetingTime";

import "css/components/Schedule";
import 'css/components/Tick';

const days = ["M", "T", "W", "R", "F"];
// define boundaries for the scale as -1 and 1 so that they are bound to
// the domains of ['undefined', 0], and [100, 'undefined'] respectively
const dayRange = ["-1", ...days, "1"];

const tickColumnWidth = `${100 / (days.length + 1)}%`;

const c = dayRange.length - 1 ;

const domain = dayRange.map((_, i) => (i + 1)/c * 100);

const xScale = d3.scale.threshold()
  .domain(domain)
  .range(dayRange);


function colorScale({course}) {
  function toNum(str) {
    let value = 0;

    for (let idx = 0; idx < str.length; idx++) {
      value += str.charCodeAt(idx);
    }

    return value
  }

  const hue = (toNum(course.subject) ** 5 + toNum(course.number)) * 16 % 255;

  return `hsl(${hue},${80}%,${70}%)`;
}

const timeScale = (startHour, endHour) => {
  const minTime = moment(startHour);
  const maxTime = moment(endHour);

  return d3.time.scale()
    .domain([minTime, maxTime])
    .range([0, 100])
    .nice() ;
};

function flatten(sections) {
  const acc = [];
  sections.forEach(
    (conflictGroup) =>
    conflictGroup.forEach(
      (section, idx) =>
      section.meeting_times.forEach(
        meetingTime => acc.push({
          meetingTime,
          section,
          conflicts: conflictGroup.length,
          idx })))
  );
  return acc;
}

const Day = ({children, style}) => (
  <div style={
    { flex: '1',
      ...style
    }}>
    {children}
  </div>
);

const DayHead = () => (
  <Row className="schedule-row schedule-header">
    <Day></Day>
    <Day>{"M"}</Day>
    <Day>{"T"}</Day>
    <Day>{"W"}</Day>
    <Day>{"R"}</Day>
    <Day>{"F"}</Day>
  </Row>
);

const HalfHourTick = ({y}) => (
  <line
    x1="0"
    x2="100%"
    y1={y}
    y2={y}
    stroke="lightgrey"
    strokeWidth="1px"
    strokeDasharray="4,4"
  />
);

const HourTick = ({y, text}) => (
  <g>
    <line
      x1="0"
      x2="100%"
      y1={y}
      y2={y}
      stroke="lightgrey"
      strokeWidth="1px"
    />
    <text
      is
      x="0"
      y={y}
      dominant-baseline="middle"
      >
      {text}
    </text>
  </g>
)

const Svg = ({children}) => (
  <svg
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg"
    style={{flex: '1'}}
    preserveAspectRatio="none"
    >
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

    {children}
  </svg>
);

const isOnTheHour = (t) => moment(t).minutes() === 0;

const Schedule = ({sections, startHour, endHour}) => {
  const yScale = timeScale(startHour, endHour);
  const ticks = yScale.ticks(d3.time.minutes, 30);
  const tickFormat = yScale.tickFormat();
  // don't show first and last ticks.
  const displayedTicks = ticks.slice(1,-1)

  return (
    <Column style={{overflow: 'hidden'}}>
      <DayHead />
      <Svg>
        { displayedTicks.map(
          (tick, idx) => (
            <g key={idx}>
              { isOnTheHour(tick) ? (
                <HourTick
                  y={yScale(tick) + "%"}
                  text={tickFormat(tick)}
                />) : (
                <HalfHourTick y={yScale(tick) + "%"}/>)
              }
            </g>))
        }

        { flatten(sections).map((block, idx) => (
          <MeetingTime
            key={idx}
            {...{yScale, xScale, colorScale}}
            {...block}
          />))
        }
      </Svg>
    </Column>
  );
};

Schedule.displayName = "Schedule";

export default Schedule;
