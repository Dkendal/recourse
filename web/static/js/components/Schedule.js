import _ from "underscore";
import React, {Component} from "react";
import ScheduleSection from "./ScheduleSection";
import Column from "./Column";
import Row from "./Row";

import "css/components/Schedule";

class Schedule extends Component {
  sectionStyle(section) {
  }

  render() {
    return (
      <div className="schedule flex">
        <div className="schedule-row schedule-header">
          <div
            className="schedule-cell"
            style={{borderColor: "transparent"}}>
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
              section =>
              <ScheduleSection
                key={section.id}
                section={section}
                startHr={this.props.startHr}
                endHr={this.props.endHr} />
              )
          }
          {
            _.range(this.props.startHr, this.props.endHr).map(
              hr =>
              <div
                className="schedule-row flex"
                key={hr}>
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
export default Schedule;
