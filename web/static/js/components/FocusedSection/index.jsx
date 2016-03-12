import React from "react";
import moment from "moment";
import { cast } from "lib/meeting_time";
import { toColor } from "lib/course";
import MeetingTime from "./MeetingTime";
// import "css/components/FocusedSection";

const dateFormat = "MMMM Do, YYYY";
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

function onEscape(event, fun) {
  // escape
  if (event.keyCode === 27) {
    fun();
  }
}

const FocusedSection = ({section, course, meetingTimes, ...props}) => (
  <section
    className="FocusedSection Tile"
    style={ { flex: 1 } }
    onKeyUp={ (e) => onEscape(e, props.hideFocusedSection) }
    tabIndex="99"
  >
    <div
      onClick={ props.hideFocusedSection }
    >
      X
    </div>

    <header
      className="Tile-padded"
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
    <article
      className="Tile-padded"
    >
      { meetingTimes.map(
        x => <MeetingTime key={x.id} { ...formatDates(cast(x)) }/>)
      }
    </article>
  </section>
);

export default FocusedSection;
