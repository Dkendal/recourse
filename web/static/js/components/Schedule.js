import _ from "underscore";
import React, {Component} from "react";
import ScheduleSection from "./ScheduleSection";
import Column from "./Column";
import Row from "./Row";

import "css/components/Schedule";

class Schedule extends Component {
  render() {
    const
    { sections
    } = this.props;

    return (
      <div className="schedule">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{"M"}</th>
              <th>{"T"}</th>
              <th>{"W"}</th>
              <th>{"R"}</th>
              <th>{"F"}</th>
            </tr>
          </thead>
          <tbody>
            {
              _.range(24).map(
                hr =>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
Schedule.displayName = "Schedule";
export default Schedule;
