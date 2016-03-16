import React, {PropTypes} from "react";
import "css/components/CourseSearch";

const CourseSearch = (props) => {
  return <div className="CourseSearch Tile Tile-padded">
    <form
      className="input margin-between-h"
      role="search"
      >
      <div className="icon-gutter">
        <i className="icon-search"></i>
      </div>
      <div className="vcenter" style={{flex: 1}}>
        <input
          name="courseName"
          type="search"
          value={ props.text }
          onChange={ e => props.setSettingsSearchText(e.target.value) }
          placeholder="Search"
        />
      </div>
    </form>
  </div>
};

export default CourseSearch;
