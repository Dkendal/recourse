import React from "react";
// import  "css/components/FocusedSection/MeetingTime";

const MeetingTime = (props) => (
  <div>
    <dl>
      <dt>{ "Days" }</dt>
      <dd>{ props.days.join(" ") }</dd>

      <dt>{ "Start time" }</dt>
      <dd>{ props.start_time }</dd>

      <dt>{"End time"}</dt>
      <dd>{ props.end_time }</dd>

      <dt>{ "Start date" }</dt>
      <dd>{ props.date_start }</dd>

      <dt>{ "End Date" }</dt>
      <dd>{ props.date_end }</dd>

      <dt>{ "Location" }</dt>
      <dd>{ props.location }</dd>

      <dt>{ "Type" }</dt>
      <dd>{ props.type }</dd>
    </dl>
  </div>
);

export default MeetingTime;
