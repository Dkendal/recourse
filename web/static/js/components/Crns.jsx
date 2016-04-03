import React, {PropTypes} from "react";
import  "css/components/Crns";

const flex = {
  display: "flex",
};

const Item = ({ text }) => (
  <li className="Crns-Item">
    { text }
    &nbsp;
  </li>
);

const Label = () => (
  <div
    className="Crns-Label"
    style={ flex }
  >
    <abbr title="Course registration numbers">
      {"Crns"}
    </abbr>
    {":"}
  </div>
);

const Crns = ({collection}) => (
  <div
    className="Crns Tile Tile-padded"
    style={ flex }
  >
    <Label />
    <ul
      style={{
        listStyle: "none",
        ...flex,
      }}
    >
      {collection.map(crn => <Item key={crn} text={crn}/>)}
    </ul>
  </div>
);

Crns.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.string),
}

export default Crns;
