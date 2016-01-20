import React, {Component, PropTypes} from "react";
import _ from "underscore";
import {List} from "immutable";

import Section from "./Section";

import "css/components/Schedule";

function scheduleSectionGroupKey(c) {
  return c.map(x => `${x.id}.${x.days}`).sort();
}

export default class Schedule extends Component {
  render() {
    const {sections, startHour, endHour} = this.props;

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
              startHour={startHour}
              endHour={endHour}
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
