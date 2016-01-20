import React, {Component, PropTypes} from "react";
import _ from "underscore";
import {List} from "immutable";
import moment from "moment";
import d3 from "d3";

import Section from "./Section";

import "css/components/Schedule";

function scheduleSectionGroupKey(c) {
  return c.map(x => `${x.id}.${x.days}`).sort();
}

export default class Schedule extends Component {
  render() {
    const {sections, startHour, endHour} = this.props;


    const minTime = moment({hours: startHour});
    const maxTime = moment({hours: endHour});

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

    return (
      <div className="schedule flex">
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

        <div className="schedule-body schedule-border flex">
          { sections.map(x => x.map(
            y =>
            <Section
              {...y}
              xScale={xScale}
              yScale={yScale}
            />
            ))
          }
          {
            _.range(startHour, endHour).map(
              hr =>
              <div
                className="schedule-row flex"
                key={hr}
              >
                <div className="schedule-cell schedule-hour">{hr}</div>
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

Schedule.propTypes = {
  endHour: PropTypes.number,
  sections: PropTypes.instanceOf(List),
  startHour: PropTypes.number
};
