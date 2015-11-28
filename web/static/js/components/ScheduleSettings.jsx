import React, {Component, PropTypes} from "react";
import {compose} from "underscore";

class ScheduleSettings extends Component {
  render() {
    const {
      onSettingsChange,
      onSubmit
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

        <input type="submit"/>
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
