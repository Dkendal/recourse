import React from "react";
import { iconName } from "lib/section";

const Footer = (props) => (
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
          <i className={ iconName(section) } />
          { section.schedule_type }
          { " " }
          { section.name }
        </a>)
      }
    </div>
  </footer>
);

export default Footer;
