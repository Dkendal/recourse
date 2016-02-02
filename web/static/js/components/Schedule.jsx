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

// Graph dimensions
const xMin = 10, xMax = 100,
  yMin = 0, yMax = 100,
  tickOffsetX = xMin;

const days = ["M", "T", "W", "R", "F"];
const dayRange = ["-1", ...days];

const domain = dayRange.map((_, i) => (i / (dayRange.length - 1)) * (xMax - xMin) + xMin)

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
    .range([yMin, yMax])
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

const HalfHourTick = ({y}) => (
  <line
    x1={`${tickOffsetX}%`}
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
      x1={`${tickOffsetX}%`}
      x2="100%"
      y1={y}
      y2={y}
      stroke="lightgrey"
      strokeWidth="1px"
    />
    <text
      is
      x={`${tickOffsetX - 1}%`}
      y={y}
      dominant-baseline="middle"
      style={{textAnchor: 'end'}}
      >
      {text}
    </text>
  </g>
)

const Svg = ({children, style}) => (
  <svg
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    style={style}
    >
    {children}
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

const dayParams = (day) => {
  const [x1, x2] = xScale.invertExtent(day);
  return {
    x: `${x1 + (x2 - x1)/ 2}%`,
    y: "1em",
    textAnchor: "middle",
  };
};

const Header = () => (
  <Svg style={{height: "2em"}}>
    {
      days.map((day, key) => (
        <text key={key} {...dayParams(day)}
          >
          {day}
        </text>))
    }
  </Svg>
);

const isOnTheHour = (t) => moment(t).minutes() === 0;

const Schedule = ({sections, startHour, endHour}) => {
  const yScale = timeScale(startHour, endHour);
  const ticks = yScale.ticks(d3.time.minutes, 30);
  const tickFormat = yScale.tickFormat();
  // don't show first and last ticks.
  const displayedTicks = ticks.slice(1,-1)

  return (
    <Column style={{overflow: 'hidden'}} className="Tile Tile-padded">
      <Header />
      <Svg style={{flex: '1'}}>
        <Defs />
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
