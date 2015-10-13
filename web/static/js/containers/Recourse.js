import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Course from "../components/Course";
import CourseList from "../components/CourseList";
import Worklist from "../components/Worklist";
import {COURSE} from "../types";
import {toggleCourseSelection} from "../actions";
import select from "../selectors";

import "normalize.css";
import "css/base";

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

    const is_selected =
      (course) => selectedCourses.has(course.id);

    return(
      <div>
        <div>
          <CourseList
            onCourseClick={onCourseClick}
            courses={courses}
            is_selected={is_selected}
          />
        </div>
        <div>
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
