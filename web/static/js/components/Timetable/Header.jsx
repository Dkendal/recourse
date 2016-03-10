import React from "react";
//import  "css/components/Timetable/Header";

const Header = ({ collection }) => (
  <svg
    x="0"
    y="0"
    width="100%"
    height="10%"
  >
    <g>
      { collection.map(({text, ...rest}) => (
        <text
          textAnchor="middle"
          y="50%"
          { ...rest }>
          { text }
        </text>))
      }
    </g>
  </svg>
);

export default Header;
