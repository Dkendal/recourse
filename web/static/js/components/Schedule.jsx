import React, {Component, PropTypes} from "react";
import _ from "underscore";
import {List} from "immutable";
import moment from "moment";
import d3 from "d3";

import Section from "./Section";

import "css/components/Schedule";

function colorFun({course}) {
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

export default class Schedule extends Component {
  render() {
    const {sections, startHour, endHour} = this.props;

    const minTime = moment(startHour);
    const maxTime = moment(endHour);

    const yScale = d3.time.scale()
      .domain([minTime, maxTime])
      .range([0, 100]);

    // define boundaries for the scale as -1 and 1 so that they are bound to
    // the domains of ['undefined', 0], and [100, 'undefined'] respectively
    const days = ["-1", "M", "T", "W", "R", "F", "1"];
    const c = days.length - 1 ;
    const domain = days.map((_, i) => (i + 1)/c * 100);

    const xScale = d3.scale.threshold()
      .domain(domain)
      .range(days);

    const colorScale = colorFun;

    const ticks = yScale.ticks(d3.time.minutes, 30);

    const tickFormat = yScale.tickFormat();

    return (
      <div className="schedule flex column">
        <div className="schedule-row schedule-header">
          <div
            className="schedule-cell"
            style={{borderColor: "transparent"}}
          >
          </div>

          <div className="schedule-cell">{"M"}</div>
          <div className="schedule-cell">{"T"}</div>
          <div className="schedule-cell">{"W"}</div>
          <div className="schedule-cell">{"R"}</div>
          <div className="schedule-cell">{"F"}</div>
        </div>

        <div className="schedule-body schedule-border flex column">
          { sections.map((x, i) => x.map(
            (y, j) =>
            <Section
              {...y}
              key={[i, j]}
              xScale={xScale}
              yScale={yScale}
              idx={j}
              conflicts={x.length}
              colorScale={colorScale}
            />
            ))
          }

          {
            ticks.map(
              hr =>
              <div
                className="schedule-row flex"
                key={tickFormat(hr)}
              >
                <div className="schedule-cell schedule-hour">
                  {tickFormat(hr)}
                </div>
                <div className="schedule-cell"></div>
                <div className="schedule-cell"></div>
                <div className="schedule-cell"></div>
                <div className="schedule-cell"></div>
                <div className="schedule-cell"></div>
              </div>
              )
          }
        </div>
      </div>
    );
  }
}

Schedule.displayName = "Schedule";
