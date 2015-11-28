import React, {Component, PropTypes} from "react";

export default class Row extends Component {
  render() {
    let { className } = this.props;
    className += " row";

    return (
      <div
        {... this.props}
        className={className}
      >
        {this.props.children}
      </div>
    );
  }
}

Row.displayName = "Row";

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
