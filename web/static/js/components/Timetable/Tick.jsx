import React from "react";

const Tick = ({ text, ...rest }) => (
  <text { ...rest }>
    { text }
  </text>
);

export default Tick;
