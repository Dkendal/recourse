import React, {Component, PropTypes} from "react";
import {compose} from "underscore";
import TextField from "components/TextField";
import Row from "components/Row";

class ScheduleSettings extends Component {
  render() {
    const {
      endTime,
      onSettingsChange,
      onSubmit,
      startTime,
      className="",
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
        className={className}
      >
        <Row className="margin-between-h">
          <TextField
            defaultValue={startTime}
            label="Prefered start time"
            name="scheduleSettings_startTime"
            type="time"
          />
          <TextField
            defaultValue={endTime}
            label="Prefered end time"
            name="scheduleSettings_endTime"
            type="time"
          />
        </Row>

        <div>
          <input
            type="submit"
            value="Build schedule"
          />
        </div>
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
