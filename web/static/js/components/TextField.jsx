import React from "react";
import "css/components/TextField";

const TextField = ({name, label, style, ...rest}) => (
  <div
    className="TextField"
    style={style}
    >
    <input
      name={name}
      id={name}
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
