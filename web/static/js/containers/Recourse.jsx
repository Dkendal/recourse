import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {compose} from "underscore";
import a from "../actions";
import select from "../selectors";
import CollectionSelect from "../components/CollectionSelect";
import Column from "../components/Column";
import Course from "../components/Course";
import CourseSearch from "../components/CourseSearch";
import Row from "../components/Row";
import Schedule from "../components/Schedule";
import ScheduleSettings from "../components/ScheduleSettings";
import Worklist from "../components/Worklist";

import "css/containers/Recourse";

class Recourse extends Component {
  getSelectedTerm({target}) {
    return Number.parseInt(target.value, 10);
  }

  render() {
    const {
      courseSearchText,
      dispatch,
      endHour,
      endTime,
      filteredCourses,
      sections,
      selectedTermIdx,
      startHour,
      startTime,
      terms,
      worklist
    } = this.props;

    const onCourseClick = compose(dispatch, a.toggleCourseSelection);

    return(
      <div>
        <div className="recourse-header">
          <select
            name="term"
            onChange={compose(dispatch, a.changeTerm, this.getSelectedTerm)}
            value={selectedTermIdx}
          >
            {
              terms.map(
                (term, idx) =>
                <option
                  key={term.id}
                  value={idx}
                >
                  {`${term.semester} ${term.year}`}
                </option>
              )
            }
          </select>
        </div>
        <Row className="recourse-body margin-between">
           {/* Left hand side */}
          <Column className="Tile">
            <CourseSearch
              text={courseSearchText}
              onSubmit={compose(dispatch, a.filterCourses)}
            />

            <CollectionSelect
              collection={filteredCourses}
              selected={worklist}
              onClick={onCourseClick}
              render={Course}
            />
          </Column>
           {/* Right hand side */}
          <Column className="Tile">
            <ScheduleSettings
              endTime={endTime}
              onSettingsChange={compose(dispatch, a.setScheduleSettings)}
              onSubmit={compose(dispatch, a.refreshSchedule)}
              startTime={startTime}
            />
            <Worklist
              courses={worklist}
              onClick={onCourseClick}
            />
            <Schedule
              endHour={endHour}
              sections={sections}
              startHour={startHour}
            />
          </Column>
        </Row>
      </div>
    );
  }
}

Recourse.displayName = "Recourse";
export default connect(select)(Recourse);
