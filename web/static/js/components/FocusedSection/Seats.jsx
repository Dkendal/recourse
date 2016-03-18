import React from "react";

const Seats = ({ actual, capacity, remaining }) => (
  <div className="FocusedSection-Seats">
    <div>{ `${ actual } of ${ capacity }, ${ remaining} remaining` }</div>
  </div>
);

export default Seats;
