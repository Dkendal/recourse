import React, {PropTypes} from "react";
//import  "css/components/Crns";

const flex = {
  display: "flex",
};

const Crn = ({text}) => (
  <li
    style={{
      marginLeft: "1em",
    }}
  >
    {text}
  </li>
);

const Label = () => (
  <div
    style={{
      fontWeight: "bold",
      ...flex,
    }}
  >
    <abbr
      title="Course registration numbers"
    >
      {"Crns"}
    </abbr>
    {":"}
  </div>
);

const Crns = ({collection}) => (
  <div
    className="Tile Tile-padded"
    style={flex}
  >
    <Label />
    <ul
      style={{
        listStyle: "none",
        ...flex,
      }}
    >
      {collection.map(crn => <Crn key={crn} text={crn}/>)}
    </ul>
  </div>
);

Crns.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.string),
}

export default Crns;
