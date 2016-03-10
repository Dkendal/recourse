import React from "react";
// import  "css/components/Timetable/MeetingTime";

const Conflict = (props) => (
  <rect className="MeetingTime-conflict" { ...props } />
);

const MeetingTime = ({section, inConflict, ...rest}) => (
  <g>
    <rect { ...rest } />

    { inConflict ?  <Conflict { ...rest } /> : null }

    <foreignObject
      requiredExtensions="http://www.w3.org/1999/xhtml"
      { ...rest }
    >
      <p>{ section.course.subject }</p>
      <p>{ section.course.number }</p>
    </foreignObject>
  </g>
);

export default MeetingTime;
