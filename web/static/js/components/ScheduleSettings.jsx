import React from "react";
import _ from "lodash";
import { Row, TextField } from "components";

const ScheduleSettings = ({ className = "", ...props }) => {
  const onSubmit = (e) => e.preventDefault()

  const getValue = e => e.target.value;
  const setStart = _.flowRight(props.setSettingsTimetableStart, getValue);
  const setEnd = _.flowRight(props.setSettingsTimetableEnd, getValue);

  return (
    <form onSubmit={ onSubmit }>
      <Row className={ `margin-between-h ${className}` }>
        <TextField
          value={ props.start }
          onChange={ setStart }
          label="Prefered start time"
          name="start"
          type="time"
        />
        <TextField
          value={ props.end }
          onChange={ setEnd }
          label="Prefered end time"
          name="end"
          type="time"
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
