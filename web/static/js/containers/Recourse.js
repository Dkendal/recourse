import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Course from "../components/Course";
import CourseList from "../components/CourseList";
import Worklist from "../components/Worklist";
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
    } = this.props;

    const onCourseClick = course => {
      return dispatch(
        toggleCourseSelection(channel, selectedCourses, course));
    };

    const isSelected =
      (course) => selectedCourses.has(course.id);

    return(
      <div
        className="Recourse container"
        >
        <div
          className="Recourse item"
          >
          <CourseList
            onCourseClick={onCourseClick}
            courses={courses}
            isSelected={isSelected}
          />
        </div>
        <div
          className="Recourse item"
          >
          <Worklist
            courses={this.props.worklist}
            onClick={onCourseClick}
          />
        </div>
      </div>
    );
  }
}

Recourse.displayName = "Recourse";

Recourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape(COURSE)),
  selectedCourses: PropTypes.arrayOf(PropTypes.shape(COURSE))
};

export default connect(select)(Recourse);
