import React, {Component} from "react";
import ScheduleSection from "./ScheduleSection";

class ScheduleSectionGroup extends Component {
  render() {
    const {collection, ...props} = this.props;

    return (
      <div>
        { collection.map(
          (section, idx) =>
          <ScheduleSection
            {...props}
            idx={idx}
            numberOfSections={collection.length}
            section={section}
          />)}
      </div>
    );
  }
}
ScheduleSectionGroup.displayName = "ScheduleSectionGroup";
export default ScheduleSectionGroup;
