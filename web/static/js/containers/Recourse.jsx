import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import CourseList from "../components/CourseList";
import Worklist from "../components/Worklist";
import Schedule from "../components/Schedule";
import Row from "../components/Row";
import Column from "../components/Column";
import * as actions from "../actions";
import select from "../selectors";

import "css/base";
import "css/containers/Recourse";

class Recourse extends Component {
  render() {
    const {
      dispatch,
      channel,
      worklist,
      selectedCourses,
      filteredCourses,
      sections
    } = this.props;

    const onCourseClick = course => {
      return dispatch(
        actions.toggleCourseSelection(channel, selectedCourses, course));
    };

    const onSubmit = (event) => {
      event.preventDefault();

      const fields = ["courseName"];

      let formValues = {};

      fields.
        map(field => event.target.elements.namedItem(field)).
        map(input => formValues[input.name] = input.value);

      return dispatch(
        actions.filterCourses(formValues)
      );
    };

    const isSelected =
      (course) => selectedCourses.has(course.id);

    return(
      <Row>
        <Column fixed>
          <div>
            <form onSubmit={onSubmit}>
              <input
                name="courseName"
                type={"search"}
              />
              <input
                type="submit"
              />
            </form>
          </div>

          <CourseList
            courses={filteredCourses}
            isSelected={isSelected}
            onCourseClick={onCourseClick}
          />
        </Column>
        <Column>
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
    );
  }
}

Recourse.displayName = "Recourse";
export default connect(select)(Recourse);
