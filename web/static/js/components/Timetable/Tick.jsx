import React from "react";

const Tick = ({ text, ...rest }) => (
  <text
    is
    dominant-baseline="middle"
    { ...rest }
  >
    { text }
  </text>
);

export default Tick;
