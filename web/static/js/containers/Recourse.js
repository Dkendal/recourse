import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Course from "../components/Course";
import {COURSE} from "../types";
import {addCourse} from "../actions";
import {select} from "../selectors";

class Recourse extends Component {
  render() {
    const {dispatch} = this.props;

    return(
      <div>
        <div>
          {this.props.courses.map((course) => {
            return <Course
              key={course.id} {...course}
              onClick={ () => { dispatch(addCourse(course.id)) } }/>;
          })}
        </div>
        <div>
          {this.props.worklist.map((course) => {
            return <Course
              key={course.id} {...course}
              onClick={ () => { dispatch(removeCourse(course.id)) } }/>;
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
