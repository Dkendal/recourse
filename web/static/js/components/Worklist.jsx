import React from "react";
import Chip from "./Chip";
import "css/components/Worklist.scss";

const Course = ({course: {subject, number}}) => (
  <span>{`${subject} ${number}`}</span>
);

const EmptyState = () => <div
  className="Worklist-Placeholder"
>
  No courses selected - choose some from left!
</div>

const Worklist = (props) => {
  return <div
    className={ `Worklist ${props.className}` }
  >
    { props.collection.size < 1 ? <EmptyState/> : null }
    { props.collection.map(
      course =>
      <Chip
        onClick={ () => {
          props.toggleSettingsCoursesSelected(course.id);
          props.refreshSchedule();
        }}
        key={course.id}>
        <Course course={course}/>
      </Chip>)
    }
  </div>
};

export default Worklist;
