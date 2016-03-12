import React from "react";
import { toColor } from "lib/course";
import MeetingTime from "./MeetingTime";
// import "css/components/FocusedSection";
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
        x => <MeetingTime key={x.id} { ...x }/>)
      }
    </article>
  </section>
);

export default FocusedSection;
