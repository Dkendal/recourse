import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

class Recourse extends Component {
  render() {
    return(
      <div>
        {this.props.courses.map((course, idx) => {
          return <span>{course}</span>;
        })}
      </div>
    );
  }
}

Recourse.displayName = "Recourse";

Recourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.integer,
    number: PropTypes.string,
    subject: PropTypes.string,
    title: PropTypes.string
  }))
};

function select(state) {
  return {
    courses: state.courses
  };
}

export default connect(select)(Recourse);
