import React from "react";

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
          { section.schedule_type }
          { " " }
          { section.name }
        </a>)
      }
    </div>
  </footer>
);

export default Footer;
