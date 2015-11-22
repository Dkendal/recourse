import React, {Component, PropTypes} from "react";
import Course from "./Course";
import {COURSE} from "../types";

export default class CourseList extends Component {
  render() {
    const style =
      { width: '100%'
      };

    return(
      <table style={style}>
        <thead>
          <tr>
            <th>{"Number"}</th>
            <th>{"Subject"}</th>
            <th>{"Title"}</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            this.props.courses.map(
              (course, idx) =>
              <Course
                key={course.id}
                onClick={() => this.props.onCourseClick(course)}
                selected={this.props.isSelected(course)}
                {...course} />
              )
          }
        </tbody>
      </table>
    );
  }
}
CourseList.displayName = "CourseList";

CourseList.propTypes = {
  addCourse: PropTypes.func
};
