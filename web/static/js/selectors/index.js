import { createSelector, createStructuredSelector } from "reselect";
import _ from "lodash";
import moment from "moment";
import { List } from "immutable";
import timetable from "./timetable";
import focusedSection from "./focusedSection";
import settings from "./settings";
import page from "./page";

export const channel = state => state.channel;
export const terms = state => state.entries.terms;
export const selectedCourses = state => state.settings.courses.selected;
export const termId = state => state.settings.terms.id;

export const term = createSelector(
  terms,
  termId,
  (terms, id) => {
    return terms.find(x => x.id == id) || terms.last();
  }
);

export const courses = createSelector(
  term,
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
  term,
  termId,
  settings,
  terms,
  timetable,
  worklist,
  worklistIds,
});
