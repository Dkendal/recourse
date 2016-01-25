import React from "react";
import {COURSE} from "types";
import "css/components/Course";

const Button = ({selected, onClick}) => (
  <button
    className="Course-toggle"
    onClick={onClick}
  >
    { selected ? "-" : "+" }
  </button>
);

const Course = ({number, subject, title, selected, onClick}) => (
  <tr className="Course">
    <td>{number}</td>
    <td>{subject}</td>
    <td>{title}</td>
    <td>
      <Button
        selected={selected}
        onClick={onClick}
      />
    </td>
  </tr>
);


Course.displayName = "Course";

Course.propTypes = COURSE;

export default Course;
