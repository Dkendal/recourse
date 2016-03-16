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

class Recourse extends Component {
  render() {
    const {
      dispatch,
      filteredCourses,
      scheduleEndTime,
      scheduleStartTime,
      sections,
      focusedSection,
      terms,
      timetable,
      worklist,
    } = this.props;

    const Header = () => (
      <div className="recourse-header">
        <TermSelect
          { ...this.props }
          { ...this.props.actions }
        />
      </div>
    );

    return(
      <div>
        <Header/>
        <Row className="recourse-body margin-between-h">
          {/* Left hand side */}
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
              { ...this.props.actions }
              { ...focusedSection }
            />
            <Column className="margin-between-v" style={ { height: '100%' } }>
              {/* End of Sliders */}
              <CourseSearch
                className="Tile Tile-padded"
                { ...this.props.actions }
                { ...this.props.settings.search }
              />
              <CollectionSelect
                className="Tile"
                collection={filteredCourses}
                render={Course}
                selected={worklist}
                onClick={ x => {
                  this.props.actions.toggleSettingsCoursesSelected(x.id);
                  this.props.actions.refreshSchedule();
                }}
              />
            </Column>
          </div>
          {/* Right hand side */}
          <Column className="margin-between-v">
            <ScheduleSettings
              className="Tile Tile-padded"
              { ...this.props.actions }
              { ...this.props.settings.timetable }
            />
            <Worklist
              className="margin-around"
              { ...this.props }
              { ...this.props.actions }
            />
            <Timetable
              { ...this.props.actions }
              {...timetable}
            />
            <Crns collection={timetable.crns}/>
          </Column>
        </Row>
      </div>
    );
  }
}

Recourse.displayName = "Recourse";

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(select, mapDispatchToProps)(Recourse);
