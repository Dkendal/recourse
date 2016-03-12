import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {compose} from "underscore";
import a from "../actions";
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

    return(
      <div>
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
        <Row className="recourse-body margin-between-h">
          {/* Left hand side */}
          { focusedSection.hidden ?
            <Column className="margin-between-v">
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
            </Column> : null
          }
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
          { focusedSection.visible ?
            <Column>
              <FocusedSection
                hideFocusedSection={ compose(dispatch, a.hideFocusedSection) }
                setFocusedSection={ compose(dispatch, a.setFocusedSection) }
                { ...focusedSection }
              />
            </Column> : null
          }
        </Row>
      </div>
    );
  }
}

Recourse.displayName = "Recourse";
export default connect(select)(Recourse);
