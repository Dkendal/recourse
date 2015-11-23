import React, {Component} from "react";
import {COURSE} from "../types";

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
      <tr>
        <td>{number}</td>
        <td>{subject}</td>
        <td>{title}</td>
        <td>
          <button
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
