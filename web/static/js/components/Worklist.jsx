import React from "react";
import Chip from "./Chip";
import "css/components/Worklist.scss";

const Course = ({course: {subject, number}}) => (
  <span>{`${subject} ${number}`}</span>
);

const Worklist = ({ className, worklist, toggleCourseSelection }) => (
  <div className={className}>
    {worklist.map(
      course =>
      <Chip
        onClick={ toggleCourseSelection }
        key={course.id}>
        <Course course={course}/>
      </Chip>
      )
    }
  </div>
);

Worklist.displayName = "Worklist";
export default Worklist;
