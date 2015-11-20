import React, {Component} from "react";

class WorklistItem extends Component {
  render() {
    return (
      <div className="worklist-item">
        <span>
          {this.props.course.subject}
        </span>
        <span>
          {this.props.course.number}
        </span>
        <button
          onClick={() => this.props.onClick(this.props.course)}>
          {"X"}
        </button>
      </div>
    );
  }
}
WorklistItem.displayName = "WorklistItem";
export default WorklistItem;
