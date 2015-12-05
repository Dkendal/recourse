import {createSelector, createStructuredSelector} from "reselect";
import _ from "underscore";
import {List} from "immutable";
import {castTime} from "lib/time";

const courseSearchText = state => state.frontEnd.courseFilter.courseName;
const endTimeStr = state => state.frontEnd.scheduleSettings.endTime;
const startHour = state => state.entries.startHour;
const endHour = state => state.entries.endHour;
const startTimeStr = state => state.frontEnd.scheduleSettings.startTime;

export const channel = state => state.channel;
export const sections = state => state.entries.sections;
export const terms = state => state.entries.terms;
export const selectedCourses = state => state.frontEnd.selectedCourses;
export const selectedTermIdx = state => state.frontEnd.selectedTerm;

const startTime = createSelector(
  startTimeStr,
  castTime
);

const endTime = createSelector(
  endTimeStr,
  castTime
);

export const scheduleSettings = createStructuredSelector({
  startTime,
  endTime
});

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
  courseSearchText,
  (courses, query) => courses.filter(
    course => {
      if (query == false) {
        return true;
      }

      const regex = new RegExp(query, "i");

      const fields = [
        course.subject,
        course.number,
        course.title
      ];

      return _.some(fields, field => regex.test(field));
    }
  )
);

export default createStructuredSelector({
  channel,
  courseSearchText,
  courses,
  endTime,
  filteredCourses,
  startHour,
  endHour,
  sections,
  selectedCourses,
  selectedTerm,
  selectedTermIdx,
  startTime,
  terms,
  worklist,
  worklistIds
});
