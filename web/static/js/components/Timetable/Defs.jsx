import React from "react";

const Defs = () => (
  <defs>
    <pattern
      is
      id="danger-stripes"
      width="10"
      height="10"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
      >
      <rect
        width="3"
        height="10"
        transform="translate(0,0)"
        fill="red"/>
    </pattern>
  </defs>
);

export default Defs;
