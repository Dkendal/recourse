import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Course from "../components/Course";
import CourseList from "../components/CourseList";
import {COURSE} from "../types";
import {toggleCourseSelection} from "../actions";
import select from "../selectors";

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

    return(
      <div>
        <CourseList
          onCourseClick={onCourseClick}
          courses={courses}
          selected={selectedCourses} />
        <div>
          {worklist.map((course) => {
            return(
              <Course
                key={course.id}
                onClick={() => onCourseClick(course)}
                selected={true}
                {...course} />
              );
          })}
        </div>
        <div>
          {this.props.sections.map(section => {
            return section;
          })}
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
