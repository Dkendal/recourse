import React from "react";
import Chip from "./Chip";
import "css/components/Worklist.scss";

const Course = ({course: {subject, number}}) => (
  <span>{`${subject} ${number}`}</span>
);

const Worklist = (props) => {
  return <div
    className={ `${props.className}` }
    style={{
      minHeight: "47px",
    }}
  >

    {props.worklist.map(
      course =>
      <Chip
        onClick={ () => {
          props.toggleSettingsCoursesSelected(course.id);
          props.actions.refreshSchedule();
        }}
        key={course.id}>
        <Course course={course}/>
      </Chip>)
    }
  </div>
};

export default Worklist;
