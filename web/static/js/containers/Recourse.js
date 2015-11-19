import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Course from "../components/Course";
import CourseList from "../components/CourseList";
import Worklist from "../components/Worklist";
import Schedule from "../components/Schedule";
import Row from "../components/Row";
import Column from "../components/Column";
import {COURSE} from "../types";
import {toggleCourseSelection} from "../actions";
import select from "../selectors";

import "css/base";
import "css/containers/Recourse";

class Recourse extends Component {
  render() {
    const
    { dispatch
    , channel
    , courses
    , worklist
    , selectedCourses
    , sections
    } = this.props;

    const onCourseClick = course => {
      return dispatch(
        toggleCourseSelection(channel, selectedCourses, course));
    };

    const isSelected =
      (course) => selectedCourses.has(course.id);

    return(
      <Row>
        <Column>
          <CourseList
            onCourseClick={onCourseClick}
            courses={courses}
            isSelected={isSelected}
          />
        </Column>
        <Column>
          <Worklist
            courses={worklist}
            onClick={onCourseClick}
          />
          <Schedule
            sections={sections}
          />
        </Column>
      </Row>
    );
  }
}

Recourse.displayName = "Recourse";

Recourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape(COURSE)),
  selectedCourses: PropTypes.arrayOf(PropTypes.shape(COURSE))
};

export default connect(select)(Recourse);
