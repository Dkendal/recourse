import React, {Component, PropTypes} from "react";

export default class Row extends Component {
  render() {
    return (
      <div
        {... this.props}
        className="row"
      >
        {this.props.children}
      </div>
    );
  }
}

Row.displayName = "Row";

Row.propTypes = {
  children: PropTypes.node
};
