import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import CourseList from "../components/CourseList";
import Worklist from "../components/Worklist";
import Schedule from "../components/Schedule";
import Row from "../components/Row";
import Column from "../components/Column";
import * as actions from "../actions";
import select from "../selectors";

import "css/base";
import "css/containers/Recourse";

class Recourse extends Component {
  render() {
    const {
      dispatch,
      channel,
      worklist,
      selectedCourses,
      filteredCourses,
      terms,
      sections
    } = this.props;

    const onCourseClick = course => {
      return dispatch(
        actions.toggleCourseSelection(channel, selectedCourses, course));
    };

    const onSubmit = (event) => {
      event.preventDefault();

      const fields = ["courseName"];

      let formValues = {};

      fields.
        map(field => event.target.elements.namedItem(field)).
        map(input => formValues[input.name] = input.value);

      return dispatch(
        actions.filterCourses(formValues)
      );
    };

    const isSelected =
      (course) => selectedCourses.has(course.id);

    const onTermChange = ({target}) => {
      const termId = Number.parseInt(target.selectedOptions[0].value, 10);
      return dispatch(actions.changeTerm(termId));
    };

    return(
      <Row style={{height: "100vh"}}>
        <Column fixed>
          <div>
            <select
              onChange={onTermChange}
              name="term"
            >
              {
                terms.map(
                  term =>
                  <option
                    key={term.id}
                    value={term.id}
                  >
                  {`${term.semester} ${term.year}`}
                  </option>
                )
              }
            </select>
          </div>

          <div>
            <form onSubmit={onSubmit}>
              <input
                name="courseName"
                type={"search"}
              />
              <input
                type="submit"
              />
            </form>
          </div>

          <CourseList
            courses={filteredCourses}
            isSelected={isSelected}
            onCourseClick={onCourseClick}
          />
        </Column>
        <Column>
          <Worklist
            courses={worklist}
            onClick={onCourseClick}
          />
          <Schedule
            endHr={20}
            sections={sections}
            startHr={7}
          />
        </Column>
      </Row>
    );
  }
}

Recourse.displayName = "Recourse";
export default connect(select)(Recourse);