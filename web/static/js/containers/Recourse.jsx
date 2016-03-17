import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "underscore";
import actions from "actions";
import select from "selectors";
import {
  Timetable,
  FocusedSection,
  CollectionSelect,
  Column,
  Course,
  CourseSearch,
  Row,
  Crns,
  ScheduleSettings,
  Worklist,
  TermSelect,
} from "components";
import "css/containers/Recourse";


const Header = (props) => (
  <div className="recourse-header">
    <TermSelect
      { ...props }
      { ...props.actions }
    />
  </div>
);

const LeftSplit = ({ focusedSection, ...props }) => (
  <div
    style={{
      position: 'relative',
      height: '100%',
      flex: 1,
    }}
  >
    {/* Sliders */}
    <FocusedSection
      className={ `slider slider-left ${ focusedSection.visible ? 'slider-focus' : '' }` }
      { ...props.actions }
      { ...focusedSection }
    />
    {/* End of Sliders */}
    <Column className="margin-between-v" style={ { height: '100%' } }>
      <CourseSearch
        className="Tile Tile-padded"
        { ...props.actions }
        { ...props.settings.search }
      />
      <CollectionSelect
        className="Tile"
        collection={ props.filteredCourses }
        render={Course}
        selected={ props.worklist }
        onClick={ x => {
          props.actions.toggleSettingsCoursesSelected(x.id);
          props.actions.refreshSchedule();
        }}
      />
    </Column>
  </div>
);

const RightSplit = (props) => (
  <Column className="margin-between-v">
    <ScheduleSettings
      className="Tile Tile-padded"
      { ...props.actions }
      { ...props.settings.timetable }
    />
    <Worklist
      className="margin-around"
      { ...props }
      { ...props.actions }
    />
    <Timetable
      { ...props.actions }
      { ...props.timetable }
    />
    <Crns collection={ props.timetable.crns }/>
  </Column>
);

const Recourse = (props) => {
  return(
    <div style={ { visibility: props.page.ready ? 'initial' : 'hidden' } }>
      <Header { ...props }/>
      <Row className="recourse-body margin-between-h">
        <LeftSplit { ...props }/>
        <RightSplit { ...props }/>
      </Row>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(select, mapDispatchToProps)(Recourse);
