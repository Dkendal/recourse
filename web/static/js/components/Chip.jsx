import React from "react";
import "css/components/Chip";

const Chip = ({children, ...props}) => (
  <div
    className="Chip"
    {...props}
    >
    <div className="Chip-inner">
      <div className="Chip-body">{children}</div>
      <i className="Chip-remove-icon icon-cancel icon"></i>
    </div>
  </div>
)

Chip.displayName = "Chip";

export default Chip;
