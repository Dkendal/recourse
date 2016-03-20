import React from "react";
import _ from "lodash";
import moment from "moment";

const defaultFormat = x => x;

const Select = ({ min, max, step, format = defaultFormat, ...props }) => (
  <select { ...props }>
    { _.range(min, max / step).map(x => step * x).map(x => (
      <option
        key={ x }
        value={ x }>
        { format(x) }
      </option>
      ))
    }
  </select>
);

function hours(props) {
  return props.value.getHours;
}

function minutes(props) {
  return props.value.getMinutes();
}

function period(props) {
  return props.value.getHours() < 12 ?  "AM" : "PM";
}

function onSetHour({ value, onChange }) {
  return (e) => {
    const t = e.target.value;
    const newValue = moment(value).hours(t).toDate();
    return onChange(newValue);
  }
}

function onSetMinutes({ value, onChange }) {
  return (e) => {
    const t = e.target.value;
    const newValue = moment(value).minutes(t).toDate();
    return onChange(newValue);
  }
}

const InlineTimePicker = (props) => {
  const am = props.value.getHours() < 12;

  return <div
    className="InlineTimePicker"
    style={{
      display: 'flex',
    }}
  >
    <Select
      value={ props.value.getHours() }
      onChange={ onSetHour(props) }
      min={ am ? 1 : 13 }
      max={ am ? 12 : 24 }
      format={ x => x % 12 }
      step={ 1 }
    />
    { ":" }
    <Select
      value={ props.value.getMinutes() }
      onChange={ onSetMinutes(props) }
      min={ 0 }
      max={ 60 }
      step={ 5 }
      format={ x => `0${x}`.slice(-2) }
    />
    <select
      id=""
      name=""
      onChange={ onSetHour(props) }
      value={ props.value.getHours() }>
      <option value={ props.value.getHours() % 12 }>AM</option>
      <option value={ (props.value.getHours() % 12) + 12 }>PM</option>
    </select>
  </div>
};

export default InlineTimePicker;
