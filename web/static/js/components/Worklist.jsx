import React, {Component, PropTypes} from "react";
import WorklistItem from "./WorklistItem";
import {List} from "immutable";

import "css/components/Worklist.scss";

export default class Worklist extends Component {
  render() {
    let {courses, ...rest} = this.props;

    return(
      <div className="worklist">
        {courses.map(
          course =>
          <WorklistItem
            {...rest}
            course={course}
            key={course.id}
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
};
