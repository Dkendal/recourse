import React from "react";
import "css/components/CircleButton";

const CircleButton = ({selected, onClick, style}) => (
  <button
    className="CircleButton"
    onClick={onClick}
    style={style}
  >
    { (selected
      ? <i className="icon-minus CircleButton-selected"></i>
      : <i className="icon-plus CircleButton-unselected"></i>)
    }
  </button>
);

export default CircleButton
