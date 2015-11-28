import React, {Component, PropTypes} from "react";

export default class Column extends Component {
  render() {
    return (
      <div
        {...this.props}
        className="column"
      >
        {this.props.children}
      </div>
    );
  }
}

Column.displayName = "Column";

Column.propTypes = {
  children: PropTypes.node
};
