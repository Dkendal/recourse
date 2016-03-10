import React from "react";

const Svg = ({children, ...props}) => (
  <svg
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    { ...props }
  >
    { children }
  </svg>
);

export default Svg;
