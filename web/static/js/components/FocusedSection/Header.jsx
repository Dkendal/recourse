import React from "react";

const Header = (props) => (
  <header
    style={{
      backgroundColor: props.color,
      display: 'flex',
    }}
  >
    <div
      className="Tile-padded"
      style={ { flex: 1 } }
    >
      <h1>
        {`${props.course.subject}
          ${props.course.number}
          `
        }
      </h1>
      <h2
        style={{
          textTransform: 'capitalize',
        }}
      >
        {`${props.course.title.toLowerCase()}
        `}
      </h2>
      <h3
        style={{
          textTransform: 'capitalize',
        }}
      >
        {`${props.section.schedule_type.toLowerCase()}
          ${props.section.name}
        `}
      </h3>
    </div>
  </header>
);

export default Header;
