import React from "react";
import Chip from "./Chip";
import "css/components/Worklist.scss";

const Course = ({course: {subject, number}}) => (
  <span>{`${subject} ${number}`}</span>
);

// hack bullshit because min height doesn't work in this layout
const Placeholder = () => <div
  className="Worklist-Placeholder"
>
  No courses selected.
</div>

const Worklist = (props) => {
  return <div
    className={ `Worklist ${props.className}` }
  >
    { props.worklist.size < 1 ? <Placeholder/> : null }
    { props.worklist.map(
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
