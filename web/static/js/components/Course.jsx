import React from "react";

const TbaIcon = () => (
  <div>TBA</div>
);

const Course = ({subject, number, title, tba}) => (
  <div
    className="vcenter"
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    }}
  >
    <div style={ { flex: 1 } }>
      <div>
        {subject}
        {" "}
        {number}
      </div>
      <div>
        {title}
      </div>
    </div>
    { tba ? <TbaIcon></TbaIcon> : null }
  </div>
)

export default Course;
