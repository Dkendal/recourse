import React, {Component, PropTypes} from "react";

export default class Column extends Component {
  render() {
    let style = {
      flex: 1,
      display: "flex",
      flexDirection: "column"
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

Column.propTypes = {
  children: PropTypes.node,
  fixed: PropTypes.bool
};
