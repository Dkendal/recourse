import React, {Component, PropTypes} from "react";
import Course from "./Course";
import {List} from "immutable";

import "css/components/CourseList";

export default class CourseList extends Component {
  render() {
    let { style, className } = this.props;

    className += " CourseList flex";

    return(
      <div
        className={className}
        style={style}
      >
        <table>
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
                (course) =>
                <Course
                  key={course.id}
                  onClick={() => this.props.onCourseClick(course)}
                  selected={this.props.isSelected(course)}
                  {...course}
                />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
CourseList.displayName = "CourseList";

CourseList.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.instanceOf(List),
  isSelected: PropTypes.func,
  style: PropTypes.string,
  onCourseClick: PropTypes.func
};
