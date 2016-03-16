import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "underscore";
import actions from "../actions";
import select from "../selectors";
import CollectionSelect from "../components/CollectionSelect";
import Column from "../components/Column";
import Course from "../components/Course";
import CourseSearch from "../components/CourseSearch";
import Row from "../components/Row";
import Crns from "../components/Crns";
import ScheduleSettings from "../components/ScheduleSettings";
import Worklist from "../components/Worklist";
import { Timetable, FocusedSection } from "../components";

import "css/containers/Recourse";

class Recourse extends Component {
  getSelectedTerm({target}) {
    return Number.parseInt(target.value, 10);
  }

  render() {
    const a = actions;

    const {
      courseSearchText,
      dispatch,
      endTime,
      filteredCourses,
      scheduleEndTime,
      scheduleStartTime,
      sections,
      selectedTermIdx,
      focusedSection,
      startTime,
      terms,
      timetable,
      worklist,
    } = this.props;

    const onCourseClick = compose(dispatch, a.toggleCourseSelection);

    const Header = () => (
      <div className="recourse-header">
        <select
          name="term"
          onChange={compose(dispatch, a.changeTerm, this.getSelectedTerm)}
          value={selectedTermIdx}
        >
          {
            terms.map(
              (term, idx) =>
              <option
                key={term.id}
                value={idx}
              >
                {`${term.semester} ${term.year}`}
              </option>
            )
          }
        </select>
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
              hideFocusedSection={ compose(dispatch, a.hideFocusedSection) }
              setFocusedSection={ compose(dispatch, a.setFocusedSection) }
              { ...focusedSection }
            />
            <Column className="margin-between-v" style={ { height: '100%' } }>
              {/* End of Sliders */}
              <CourseSearch
                className="Tile Tile-padded"
                onSubmit={compose(dispatch, a.filterCourses)}
                text={courseSearchText}
              />
              <Worklist
                className="margin-around"
                courses={worklist}
                onClick={onCourseClick}
              />
              <CollectionSelect
                className="Tile"
                collection={filteredCourses}
                onClick={onCourseClick}
                render={Course}
                selected={worklist}
              />
            </Column>
          </div>
          {/* Right hand side */}
          <Column className="margin-between-v">
            <ScheduleSettings
              endTime={endTime}
              onSettingsChange={compose(dispatch, a.setScheduleSettings)}
              onSubmit={compose(dispatch, a.refreshSchedule)}
              startTime={startTime}
              className="Tile Tile-padded"
            />
            <Timetable
              setFocusedSection={ compose(dispatch, a.setFocusedSection) }
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
