import React from "react";

function getValue(e) {
  return Number.parseInt(e.target.value, 10);
}

const TermSelect = (props) => (
  <select
    name="term"
    className="TermSelect"
    onChange={ (e) => props.setSettingsTermsId(getValue(e)) }
    value={ props.value }
  >
    { props.collection.map((term, idx) => (
      <option
        key={term.id}
        value={term.id}
      >
        {`${term.semester} ${term.year}`}
      </option>))
    }
  </select>
);

export default TermSelect;
