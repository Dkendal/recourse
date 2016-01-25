import React from "react";
import {COURSE} from "types";
import "css/components/Course";

const text = (selected) => selected ? "-" : "+";

const Course = ({number, subject, title, selected, onClick}) => (
  <tr className="Course">
    <td>{number}</td>
    <td>{subject}</td>
    <td>{title}</td>
    <td>
      <button
        className="Course-toggle"
        onClick={onClick}
        >
        {text(selected)}
      </button>
    </td>
  </tr>
);


Course.displayName = "Course";

Course.propTypes = COURSE;

export default Course;
