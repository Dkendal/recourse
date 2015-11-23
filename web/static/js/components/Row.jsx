import React, {Component, PropTypes} from "react";

export default class Row extends Component {
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

Row.propTypes = {
  children: PropTypes.node
};
