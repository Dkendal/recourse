import React from "react";
import "css/components/TextField";

const TextField = ({name, label, style, className="", ...rest}) => (
  <div
    className="TextField"
    style={style}
    >
    <input
      name={name}
      id={name}
      className={className + " input-with-focus"}
      {...rest}
    />
    <label
      htmlFor={name}
      >
      {label}
    </label>
  </div>
);

export default TextField;
