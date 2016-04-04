import { createSelector, createStructuredSelector } from "reselect";
import _ from "lodash";
import moment from "moment";
import { List } from "immutable";
import timetable from "./timetable";
import focusedSection from "./focusedSection";
import settings from "./settings";
import page from "./page";

const courseSearchText = state => state.frontEnd.courseFilter.courseName;

export const channel = state => state.channel;
export const terms = state => state.entries.terms;
export const selectedCourses = state => state.settings.courses.selected;
export const selectedTermIdx = state => state.frontEnd.selectedTerm;

export const selectedTerm = createSelector(
  terms,
  selectedTermIdx,
  (terms, idx) => terms.get(idx)
);

export const courses = createSelector(
  selectedTerm,
  (term) => new List(term && term.courses || [])
);

export const worklist = createSelector(
  courses,
  selectedCourses,
  (courses, selectedCourses) => {
    return courses.filter(
      ({id}) => selectedCourses.has(id)
    );
  }
);

export const worklistIds = createSelector(
  worklist,
  courses => new List(courses.map(course => course.id))
);

/* Filter courses based on parameters set in the course filter.
 *
 * Return true if no value set on courseName.
 */
const filteredCourses = createSelector(
  courses,
  (state => state.settings.search),
  (courses, search) => courses.filter(
    course => {
      let result = courses;

      if (search.text) {
        const regex = new RegExp(search.text, "i");

        const text = [
          course.subject,
          course.number,
          course.title,
        ].join(" ");

        result = regex.test(text);
      }

      return result;
    }
  ).slice(0, 100)
);

export default createStructuredSelector({
  channel,
  courses,
  filteredCourses,
  focusedSection,
  page,
  selectedCourses,
  selectedTerm,
  selectedTermIdx,
  settings,
  terms,
  timetable,
  worklist,
  worklistIds,
});
