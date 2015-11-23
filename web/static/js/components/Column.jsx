import React, {Component, PropTypes} from "react";

export default class Column extends Component {
  render() {
    let {style, ...rest} = this.props;
    style = style || {};

    if (this.props.fixed) {
      style.maxHeight = "100vh";
      style.overflowY = "scroll";
    }

    return (
      <div
        {...rest}
        className="column"
        style={style}
      >
        {this.props.children}
      </div>
    );
  }
}

Column.displayName = "Column";

Column.propTypes = {
  children: PropTypes.node,
  fixed: PropTypes.bool,
  style: PropTypes.object
};
