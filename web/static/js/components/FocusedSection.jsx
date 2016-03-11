import React from "react";
import moment from "moment";
import { cast } from "lib/meeting_time";
import { toColor } from "lib/course";
// import "css/components/FocusedSection";

const dateFormat = "MMMM DD, YYYY";
const timeFormat = "h:mm a";

function formatDates(mt) {
  const date_start = moment(mt.date_start).format(dateFormat);
  const date_end   = moment(mt.date_end).format(dateFormat);
  const end_time   = moment(mt.end_time).format(timeFormat);
  const start_time = moment(mt.start_time).format(timeFormat);

  return {
    ...mt,
    start_time,
    end_time,
    date_start,
    date_end,
  };
}

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

const FocusedSection = ({section: { course, meeting_times, ...section }, ...props}) => (
  <section
    className="FocusedSection Tile Tile-padded"
    style={ { flex: 1 } }
  >
    <div
      onClick={ props.hideFocusedSection }
    >
      X
    </div>
    <header
      style={{
        backgroundColor: toColor(course),
      }}
    >
      <h1>
        {`${course.subject}
          ${course.number}
          `
        }
      </h1>
      <h2
        style={{
          textTransform: 'capitalize',
        }}
      >
        {`${course.title.toLowerCase()}
        `}
      </h2>
      <h3
        style={{
          textTransform: 'capitalize',
        }}
      >
        {`${section.schedule_type.toLowerCase()}
          ${section.name}
        `}
      </h3>
    </header>
    <article>
      { meeting_times.map(
        x => <MeetingTime key={x.id} { ...formatDates(cast(x)) }/>)
      }
    </article>
  </section>
);

export default FocusedSection;
