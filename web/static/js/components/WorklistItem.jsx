import React, {PropTypes} from "react";
import CircleButton from "./CircleButton";
import {COURSE} from "../types";

const WorklistItem = ({course, onClick}) => (
  <div className="worklist-item">
    <span>
      {course.subject}
    </span>
    <span>
      {course.number}
    </span>
    <CircleButton
      onClick={() => onClick(course)}
      selected={true}
    />
  </div>
)

WorklistItem.displayName = "WorklistItem";

WorklistItem.propTypes = {
  course: PropTypes.shape(COURSE),
  onClick: PropTypes.func
};

export default WorklistItem;
