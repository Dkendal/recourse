import React, {Component, PropTypes} from "react";
import WorklistItem from "./WorklistItem";
import {List} from "immutable";

import "css/components/Worklist.scss";

export default class Worklist extends Component {
  render() {
    return(
      <div className="worklist">
        {this.props.courses.map(
          course =>
          <WorklistItem
            course={course}
            key={course.id}
            onClick={this.props.onClick}
          />
          )
        }
      </div>
    );
  }
}

Worklist.displayName = "Worklist";

Worklist.propTypes = {
  courses: PropTypes.instanceOf(List),
  onClick: PropTypes.func
}
