import React from "react";
import classnames from "classnames";

const Column = ({children, className='', ...rest}) => (
  <div
    className={ classnames(className, " column") }
    { ...rest }
    >
    { children }
  </div>
);

Column.displayName = "Column";
export default Column;
