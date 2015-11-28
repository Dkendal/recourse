import React, {Component, PropTypes} from "react";

class ScheduleSettings extends Component {
  render() {
    const {
      onBlur
    } = this.props;

    return (
      <form
        action=""
        onBlur={onBlur}
      >
        <label htmlFor="scheduleSettings_startTime">
          {"Prefered start time"}
        </label>
        <input
          name="scheduleSettings_startTime"
          type="time"
        />

        <label htmlFor="scheduleSettings_endTime">
          {"Prefered end time"}
        </label>
        <input
          name="scheduleSettings_endTime"
          type="time"
        />
      </form>
    );
  }
}
ScheduleSettings.displayName = "ScheduleSettings";

ScheduleSettings.propTypes = {
  onBlur: PropTypes.func
};

export default ScheduleSettings;
