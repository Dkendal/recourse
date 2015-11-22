import React, {Component, PropTypes} from "react";
import Course from "./Course";
import WorklistItem from "./WorklistItem";
import {COURSE} from "../types";

import "css/components/Worklist.scss";

export default class Worklist extends Component {
  render() {
    return(
      <div className="worklist">
        {this.props.courses.map(
          course =>
          <WorklistItem
            course={course}
            onClick={this.props.onClick}/>
          )
        }
      </div>
    );
  }
}
Worklist.displayName = "Worklist";
Worklist.propTypes = COURSE;
