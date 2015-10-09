import React, {Component, PropTypes} from "react";
import Course from "./Course";
import {COURSE} from "../types";

export default class LeftPanel extends Component {
  render() {
    return(
      <ul>
        {this.props.courses.map(
          (course, idx) =>
          <li>
            <Course
              key={course.id}
              onClick={() => this.props.onCourseClick(course)}
              selected={this.props.selected.has(course.id)}
              {...course} />
          </li>
          )
        }
      </ul>
    );
  }
}
LeftPanel.displayName = "LeftPanel";

LeftPanel.propTypes = {
  addCourse: PropTypes.func,
  courses: PropTypes.arrayOf(
    PropTypes.shape(COURSE)
  )
};
