import _ from "underscore";
import React, {Component} from "react";
import ScheduleSection from "./ScheduleSection";
import Column from "./Column";
import Row from "./Row";

class Schedule extends Component {
  render() {
    const {
      sections
    } = this.props;

    const containerStyle = {
    };

    return (
      <article
        style={containerStyle} >
        <Row>
          {
            ["M", "T", "W", "R", "F"].map(
            day =>
            <Column>
              {day}
            </Column>
            )
          }
        </Row>

        <Row>
          {
            _.range(5).map(
              _day =>
              <Column>
                {
                  _.range(24).map(
                    hr =>
                    <div>
                      {hr}
                    </div>
                  )
                }
              </Column>
            )
          }
        </Row>

        <div>
          {
            sections.map(
              section =>
              <ScheduleSection
                section={section} />
            )
          }
        </div>
      </article>
    );
  }
}
Schedule.displayName = "Schedule";
export default Schedule;
