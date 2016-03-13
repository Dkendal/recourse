import React from "react";
import RelatedSection from "./RelatedSection";
import "css/components/FocusedSection/Footer";

const Empty = () => (
  <span className="FocusedSection-Footer-Empty">
    { 'No other sections for this course.' }
  </span>
);

const Footer = (props) => (
  <footer className="Tile-padded">
    <h2>{ "Related Sections" }</h2>
    <div>
      { props.relatedSections.map(section => <RelatedSection
        key={ section.id }
        { ...props }
        { ...section }/>) }
      { props.relatedSections.length < 1 ?  <Empty/> : '' }
    </div>
  </footer>
);

export default Footer;
