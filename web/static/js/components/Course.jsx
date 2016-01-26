import React from "react";
import {COURSE} from "types";
import "css/components/Course";
import "css/components/CircleButton";

const CircleButton = ({selected, onClick, style}) => (
  <button
    className="CircleButton"
    onClick={onClick}
    style={style}
    >
    { selected ?
      <i className="icon-minus CircleButton-selected"></i> :
      <i className="icon-plus CircleButton-unselected"></i>
    }
  </button>
);

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
