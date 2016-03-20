import React from "react";
import _ from "lodash";
import {
  Row,
  TextField,
  InlineTimePicker,
} from "components";

const ScheduleSettings = ({ className = "", ...props }) => {
  const onSubmit = (e) => e.preventDefault()

  return (
    <form onSubmit={ onSubmit }>
      <Row className={ `margin-between-h ${className}` }>
        <InlineTimePicker
          value={ props.start }
          onChange={ props.setSettingsTimetableStart }
        />
        <InlineTimePicker
          value={ props.end }
          onChange={ props.setSettingsTimetableEnd }
        />
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
