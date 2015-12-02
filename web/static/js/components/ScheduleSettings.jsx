import React, {Component, PropTypes} from "react";
import {compose} from "underscore";

class ScheduleSettings extends Component {
  render() {
    const {
      endTime,
      onSettingsChange,
      onSubmit,
      startTime
    } = this.props;

    const preventDefault = (e) => {
      e.preventDefault();
      return e;
    };

    return (
      <form
        action=""
        onKeyUp={onSettingsChange}
        onSubmit={compose(onSubmit, preventDefault)}
      >
        <label htmlFor="scheduleSettings_startTime">
          {"Prefered start time"}
        </label>
        <input
          defaultValue={startTime}
          name="scheduleSettings_startTime"
          type="time"
        />

        <label htmlFor="scheduleSettings_endTime">
          {"Prefered end time"}
        </label>
        <input
          defaultValue={endTime}
          name="scheduleSettings_endTime"
          type="time"
        />

        <input
          type="submit"
          value="Build schedule"
        />
      </form>
    );
  }
}
ScheduleSettings.displayName = "ScheduleSettings";

ScheduleSettings.propTypes = {
  onSettingsChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ScheduleSettings;
