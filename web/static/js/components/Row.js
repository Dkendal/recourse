import React, {Component} from "react";

class Row extends Component {
  render() {
    const style = {
      display: "flex"
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}
Row.displayName = "Row";
export default Row;
