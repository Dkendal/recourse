import React from "react";
import _ from "lodash";
import {
  Row,
  InlineTimePicker,
} from "components";

const ScheduleSettings = ({ className = "", ...props }) => {
  const onSubmit = (e) => {
    props.actions.refreshSchedule();
    return e.preventDefault();
  }

  const setStart = (e) => {
    props.actions.setSettingsTimetableStart(e);
    props.actions.refreshSchedule();
  }

  const setEnd = (e) => {
    props.actions.setSettingsTimetableEnd(e);
    props.actions.refreshSchedule();
  }

  return (
    <form onSubmit={ onSubmit }>
      <Row
        className={ `margin-between-h ${className}` }
      >
        <div className="stacked-input-group">
          <InlineTimePicker
            name="settings.timetable.start"
            value={ props.start }
            onChange={ setStart }
          />
          <label htmlFor="settings.timetable.start">
            { "Preferred start time" }
          </label>
        </div>

        <div className="stacked-input-group">
          <InlineTimePicker
            value={ props.end }
            onChange={ setEnd }
          />
          <label htmlFor="settings.timetable.end">
            { "Preferred start end" }
          </label>
        </div>
      </Row>
    </form>
  );
}

export default ScheduleSettings;
