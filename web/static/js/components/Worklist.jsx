import React from "react";
import Chip from "./Chip";
import "css/components/Worklist.scss";

const Course = ({course: {subject, number}}) => (
  <span>{`${subject} ${number}`}</span>
);

const Worklist = ({courses, className, onClick}) => (
  <div className={className}>
    {courses.map(
      course =>
      <Chip
        onClick={() => onClick(course)}
        key={course.id}>
        <Course course={course}/>
      </Chip>
      )
    }
  </div>
);

Worklist.displayName = "Worklist";
export default Worklist;
