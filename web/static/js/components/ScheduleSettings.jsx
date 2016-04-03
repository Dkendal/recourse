import React from "react";
import _ from "lodash";
import {
  Row,
  InlineTimePicker,
} from "components";

const ScheduleSettings = ({ className = "", ...props }) => {
  const onSubmit = (e) => {
    props.refreshSchedule();
    return e.preventDefault();
  };

  const setStart = (e) => {
    props.setSettingsTimetableStart(e);
    props.refreshSchedule();
  };

  const setEnd = (e) => {
    props.setSettingsTimetableEnd(e);
    props.refreshSchedule();
  };

  return (
    <form onSubmit={ onSubmit }>
      <Row
        className={ `margin-between-h ${className}` }
      >
        <div className="stacked-input-group">
          <InlineTimePicker
            name="settings.timetable.start"
            value={ props.timetable.start }
            onChange={ setStart }
          />
          <label htmlFor="settings.timetable.start">
            { "Preferred start time" }
          </label>
        </div>

        <div className="stacked-input-group">
          <InlineTimePicker
            value={ props.timetable.end }
            onChange={ setEnd }
          />
          <label htmlFor="settings.timetable.end">
            { "Preferred end time" }
          </label>
        </div>
      </Row>
    </form>
  );
}

export default ScheduleSettings;
