import React from "react";
import { iconName } from "lib/section";

const RelatedSection = (props) => (
  <a
    href="#"
    onClick={ () => props.setFocusedSection(props.id) }
    key={ props.id }
  >
    <i className={ iconName(props) } />
    { props.schedule_type }
    { " " }
    { props.name }
  </a>
);

export default RelatedSection;
