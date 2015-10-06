import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Course from "../components/Course";
import {COURSE} from "../types";
import {addCourse} from "../actions";

class Recourse extends Component {
  render() {
    const {courses, selectedCourses, dispatch} = this.props;

    return(
      <div>
        <div>
          {courses.map((course) => {
            return <Course
              key={course.id} {...course}
              onClick={ () => { dispatch(addCourse(course)) } }/>;
          })}
        </div>
        <div>
          {selectedCourses.map((course) => {
            return <Course key={course.id} {...course}/>;
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

function select(state) {
  return {
    courses: state.courses,
    selectedCourses: state.selectedCourses
  };
}

export default connect(select)(Recourse);
