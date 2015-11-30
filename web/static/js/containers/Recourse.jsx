import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import CourseList from "../components/CourseList";
import CourseSearch from "../components/CourseSearch";
import Worklist from "../components/Worklist";
import Schedule from "../components/Schedule";
import ScheduleSettings from "../components/ScheduleSettings";
import Row from "../components/Row";
import Column from "../components/Column";
import a from "../actions";
import select from "../selectors";
import {compose} from "underscore";

import "css/base";
import "css/containers/Recourse";

class Recourse extends Component {
  getSelectedTerm({target}) {
    return Number.parseInt(target.selectedOptions[0].value, 10);
  }

  render() {
    const {
      dispatch,
      worklist,
      filteredCourses,
      terms,
      sections
    } = this.props;

    const onCourseClick = compose(dispatch, a.toggleCourseSelection);

    return(
      <div>
        <div className="recourse-header">
          <select
            name="term"
            onChange={compose(dispatch, a.changeTerm, this.getSelectedTerm)}
          >
            {
              terms.map(
                term =>
                <option
                  key={term.id}
                  value={term.id}
                >
                  {`${term.semester} ${term.year}`}
                </option>
              )
            }
          </select>
        </div>
        <Row className="recourse-body">
          <Column>
            <CourseSearch
              onSubmit={compose(dispatch, a.filterCourses)}
            />

            <CourseList
              courses={filteredCourses}
              isSelected={(c) => worklist.includes(c)}
              onCourseClick={onCourseClick}
            />
          </Column>
          <Column>
            <ScheduleSettings
              onSettingsChange={compose(dispatch, a.setScheduleSettings)}
              onSubmit={compose(dispatch, a.refreshSchedule)}
            />
            <Worklist
              courses={worklist}
              onClick={onCourseClick}
            />
            <Schedule
              endHr={20}
              sections={sections}
              startHr={7}
            />
          </Column>
        </Row>
      </div>
    );
  }
}

Recourse.displayName = "Recourse";
export default connect(select)(Recourse);
