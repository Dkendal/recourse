import React from "react";
import {COURSE} from "types";
import CircleButton from "./CircleButton";
import "css/components/Course";

const Course = ({number, subject, title, selected, onClick}) => (
  <tr className="Course">
    <td>{number}</td>
    <td>{subject}</td>
    <td>{title}</td>
    <td>
      <CircleButton
        onClick={onClick}
        selected={selected}
        style={ {float: "right"} }
      />
    </td>
  </tr>
);


Course.displayName = "Course";

Course.propTypes = COURSE;

export default Course;
