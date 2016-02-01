import React from "react";

const Course = ({subject, number, title}) => (
  <div className="vcenter">
    <div>
      {subject}
      {" "}
      {number}
    </div>
    <div>
      {title}
    </div>
  </div>
)

export default Course;
