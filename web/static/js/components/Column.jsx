import React from "react";
const Column = ({children, className='', ...rest}) => (
  <div
    className={className + " column"}
    {...rest}
    >
    {children}
  </div>
);

Column.displayName = "Column";
export default Column;
