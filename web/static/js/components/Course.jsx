import React from "react";
import {COURSE} from "types";
import CircleButton from "./CircleButton";
import Row from "./Row";
import "css/components/Course";

const className = (selected) => (
  [
    "Course",
    selected ? "selected" : "",
  ].join(" ")
);

const Course = ({number, subject, title, selected, onClick}) => (
  <Row
    className={className(selected)}
    onClick={onClick}
    >
    <div className="vcenter">
      { selected ?
        <i className="icon icon-check"></i> :
        <i className="icon icon-check-empty"></i>
      }
    </div>
    <div className="vcenter">{number}</div>
    <div className="vcenter">{subject}</div>
    <div className="flex vcenter">{title}</div>
  </Row>
);


Course.displayName = "Course";

Course.propTypes = COURSE;

export default Course;
