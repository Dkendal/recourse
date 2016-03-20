import React from "react";
import _ from "lodash";
import {
  Row,
  InlineTimePicker,
} from "components";

const ScheduleSettings = ({ className = "", ...props }) => {
  const onSubmit = (e) => e.preventDefault()

  return (
    <form onSubmit={ onSubmit }>
      <Row
        className={ `margin-between-h ${className}` }
        style={{
          justifyContent: 'space-between',
        }}
      >
        <div className="stacked-input-group">
          <InlineTimePicker
            name="settings.timetable.start"
            value={ props.start }
            onChange={ props.setSettingsTimetableStart }
          />
          <label htmlFor="settings.timetable.start">
            { "Preferred start time" }
          </label>
        </div>

        <div className="stacked-input-group">
          <InlineTimePicker
            value={ props.end }
            onChange={ props.setSettingsTimetableEnd }
          />
          <label htmlFor="settings.timetable.end">
            { "Preferred start end" }
          </label>
        </div>

        <div className="icon-hover-wrap icon-gutter vcenter">
          <button className="icon-btn">
            <i className="icon-cw icon-hovered icon-spin3"></i>
            <i className="icon-hover"></i>
          </button>
        </div>
      </Row>
    </form>
  );
}

export default ScheduleSettings;
