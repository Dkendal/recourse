import React, {Component, PropTypes} from "react";
import ScheduleSectionGroup from "./ScheduleSectionGroup";
import _ from "underscore";
import {List} from "immutable";

import "css/components/Schedule";

export default class Schedule extends Component {
  render() {
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
            this.props.sections.map(
              collection =>
              <ScheduleSectionGroup
                collection={collection}
                endHr={this.props.endHr}
                key={collection.map(x => x.id).sort()}
                startHr={this.props.startHr}
              />
            )
          }
          {
            _.range(this.props.startHr, this.props.endHr).map(
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
