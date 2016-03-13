import React from "react";
import { iconName } from "lib/section";
import "css/components/FocusedSection/Header";

const Header = (props) => (
  <header
    className="FocusedSection-Header"
    style={{
      backgroundColor: props.color,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <i className={ "FocusedSection-Header-icon " + iconName(props.section) }></i>
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
