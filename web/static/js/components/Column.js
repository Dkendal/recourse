import React, {Component} from "react";

class Column extends Component {
  render(inner) {
    let style =
      { flex: 1
      , display: "flex"
      , flexDirection: "column"
      };

    if (this.props.fixed) {
      style.maxHeight = "100vh";
      style.overflowY = "scroll";
    }

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}
Column.displayName = "Column";
export default Column;