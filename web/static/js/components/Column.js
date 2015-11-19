import React, {Component} from "react";

class Column extends Component {
  render(inner) {
    const style = {
      flex: 1
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}
Column.displayName = "Column";
export default Column;
