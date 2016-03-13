import React from "react";
import RelatedSection from "./RelatedSection";

const Footer = (props) => (
  <footer className="Tile-padded">
    <h2>{ "Related Sections" }</h2>
    <div>
      { props.relatedSections.map(section => <RelatedSection
        key={ section.id }
        { ...props }
        { ...section }/>) }
    </div>
  </footer>
);

export default Footer;
