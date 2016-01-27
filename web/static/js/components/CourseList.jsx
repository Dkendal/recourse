import React, {PropTypes} from "react";
import Course from "./Course";
import {List} from "immutable";

import "css/components/CourseList";

const className = ({className}) => (
  [
    "CourseList",
    "Flex",
  ].join(" ") + " " + className
);

const CourseList = ({style, ...props}) => (
  <div
    className={className(props)}
    style={style}
    >
    {
      props.courses.map(
        (course) =>
        <Course
          key={course.id}
          onClick={() => props.onCourseClick(course)}
          selected={props.isSelected(course)}
          {...course}
        />)
    }
  </div>
);

CourseList.displayName = "CourseList";

CourseList.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.instanceOf(List),
  isSelected: PropTypes.func,
  style: PropTypes.string,
  onCourseClick: PropTypes.func
};

export default CourseList;
