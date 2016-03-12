import React from "react";
// import  "css/components/FocusedSection/MeetingTime";

const MeetingTime = (props) => (
  <div>
    <dl>
      <dt>{ "When" }</dt>
      <dd>
        <div>
          { props.start_time }
          { " - " }
          { props.end_time }
        </div>
        <div>
          { props.days.join(" ") }
        </div>
        <div>
          { props.type }
        </div>
        <div>
          { props.date_start }
          { " - " }
          { props.date_end }
        </div>
      </dd>

      <dt>{ "Location" }</dt>
      <dd>{ props.location }</dd>
    </dl>
  </div>
);

export default MeetingTime;
