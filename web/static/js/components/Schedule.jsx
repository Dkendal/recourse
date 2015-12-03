import React, {Component, PropTypes} from "react";
import _ from "underscore";
import {List} from "immutable";
import {parseTime, timeToNumber} from "lib/time";

import ScheduleSectionGroup from "./ScheduleSectionGroup";
import "css/components/Schedule";

const maxStartHr = 8;
const minEndHr = 17;

function scheduleSectionGroupKey(c) {
  return c.map(x => `${x.id}.${x.days}`).sort();
}

function scale(fn, t, defFn) {
  return _.compose(defFn, fn, timeToNumber, parseTime)(t);
}

// Number (Number Number -> Number) -> Number
function defT(def, fn) {
  return t => fn(t || def, def);
}

function attrs(collection, predicate) {
  return collection.flatMap(x => x.map(predicate));
}

export default class Schedule extends Component {
  render() {
    const {sections} = this.props;

    const min = attrs(sections, x => x.time_start).min();
    const max = attrs(sections, x => x.time_end).max();

    const startHr = scale(Math.floor, min, defT(maxStartHr, Math.min));
    const endHr = scale(Math.ceil, max, defT(minEndHr, Math.max));

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
          {
            sections.map(
              collection =>
              <ScheduleSectionGroup
                collection={collection}
                endHr={endHr}
                key={scheduleSectionGroupKey(collection)}
                startHr={startHr}
              />
            )
          }
          {
            _.range(startHr, endHr).map(
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
  endHr: PropTypes.number,
  sections: PropTypes.instanceOf(List),
  startHr: PropTypes.number
};
