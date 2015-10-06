import React, {Component, PropTypes} from "react";
import {COURSE} from "../types";

export default class Course extends Component {
  render() {
    const {description, number, subject, title, onClick} = this.props;

    return(
      <div>
        <span>{description}</span>
        <span>{number}</span>
        <span>{subject}</span>
        <span>{title}</span>
        <span>
          <button
            onClick={onClick}>
            {"click me"}
          </button>
        </span>
      </div>
    );
  }
}

Course.displayName = "Course";

Course.propTypes = COURSE;
