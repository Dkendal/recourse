import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Course from "../components/Course";
import {COURSE} from "../types";
import {addToSchedule, removeFromSchedule} from "../actions";
import select from "../selectors";

class Recourse extends Component {
  render() {
    const {dispatch, channel, courses, worklist} = this.props;

    return(
      <div>
        <div>
          {courses.map((course) => {
            return(
              <Course
              key={course.id}
              onClick={ () => dispatch(
                addToSchedule(channel)(course))
              }
              {...course} />
            );
          })}
        </div>
        <div>
          {worklist.map((course) => {
            return(
              <Course
                key={course.id}
                onClick={ () => dispatch(
                  removeFromSchedule(channel)(course))
                }
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
