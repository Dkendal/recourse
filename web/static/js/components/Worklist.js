import React, {Component, PropTypes} from "react";
import Course from "./Course";

export default class Worklist extends Component {
  render() {
    return(
      <ul>
        {this.props.courses.map(
          (course, idx) =>
          <li>
            <span>
              {course.subject}
            </span>
            <span>
              {course.number}
            </span>
            <button
              onClick={() => this.props.onClick(course)}>
              {"X"}
            </button>
          </li>
          )
        }
      </ul>
    );
  }
}
Worklist.displayName = "Worklist";
