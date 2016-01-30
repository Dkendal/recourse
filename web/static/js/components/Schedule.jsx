import React, {Component, PropTypes} from "react";
import _ from "underscore";
import {List} from "immutable";
import moment from "moment";
import Row from "./Row";
import d3 from "d3";

import MeetingTime from "./Section";

import "css/components/Schedule";

const days = ["M", "T", "W", "R", "F"];
// define boundaries for the scale as -1 and 1 so that they are bound to
// the domains of ['undefined', 0], and [100, 'undefined'] respectively
const dayRange = ["-1", ...days, "1"];

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
    .range([0, 100]);
};

function flatten(sections, fun) {
  return sections.map(
    (conflictGroup) =>
    conflictGroup.map(
      (section, idx) =>
      section.meeting_times.map(
        meetingTime =>
        fun({section, meetingTime, conflicts: conflictGroup.length, idx}))));
}

const Tick = ({children}) => (
  <div style={
    { flex: '1'
    }}>
    {children}
  </div>
);

const Day = ({children}) => (
  <div style={
    { flex: '1'
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

const Schedule = (props) => {
  const {sections, startHour, endHour} = props;

  const yScale = timeScale(startHour, endHour);

  const ticks = yScale.ticks(d3.time.minutes, 30);
  const tickFormat = yScale.tickFormat();

  return (
    <div className="schedule flex column">
      <DayHead />
      <div className="schedule-body schedule-border flex column">
        <div>
        {
          flatten(sections, ({
            section, meetingTime, conflicts, idx
          }) => <MeetingTime
            colorScale={colorScale}
            course={section.course}
            conflicts={conflicts}
            idx={idx}
            meetingTime={meetingTime}
            section={section}
            xScale={xScale}
            yScale={yScale}
          />)
        }
        </div>

        <div style={
          { position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
          { ticks.map(
            (hr, idx) =>
            <Tick key={idx}>
              { tickFormat(hr) }
            </Tick>
            )
          }
        </div>
      </div>
    </div>
  );
};

Schedule.displayName = "Schedule";

export default Schedule;
