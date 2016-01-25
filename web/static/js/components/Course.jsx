import React, {Component} from "react";
import {COURSE} from "../types";
import "css/components/Course";

export default class Course extends Component {
  render() {
    const {
      number,
      subject,
      title,
      selected,
      onClick
    } = this.props;

    const text = selected ? "-" : "+";
    return(
      <tr className="Course">
        <td>{number}</td>
        <td>{subject}</td>
        <td>{title}</td>
        <td>
          <button
            className="Course-toggle"
            onClick={onClick}
          >
            {text}
          </button>
        </td>
      </tr>
    );
  }
}

Course.displayName = "Course";

Course.propTypes = COURSE;
