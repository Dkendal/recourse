import React from "react";
import MeetingTime from "./MeetingTime";
// import "css/components/FocusedSection";

const FocusedSection = ({section, course, meetingTimes, ...props}) => (
  <section
    className={ `FocusedSection Tile ${props.className}` }
  >
    <div
      onClick={ props.hideFocusedSection }
    >
      X
    </div>

    <header
      className="Tile-padded"
      style={{
        backgroundColor: props.color,
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
    <footer className="Tile-padded">
      <h2>{ "Related Sections" }</h2>
      <div>
        { props.relatedSections.map(
          section =>
          <a
            href="#"
            onClick={ () => props.setFocusedSection(section.id) }
            key={ section.id }
          >
            { section.schedule_type }
            { " " }
            { section.name }
          </a>)
        }
      </div>
    </footer>
  </section>
);

export default FocusedSection;
