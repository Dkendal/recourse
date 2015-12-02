import {createSelector, createStructuredSelector} from "reselect";
import _ from "underscore";
import {List} from "immutable";
import moment from "moment";

const startTimeStr = state => state.frontEnd.scheduleSettings.startTime;
const endTimeStr = state => state.frontEnd.scheduleSettings.endTime;

export const channel = state => state.channel;
export const sections = state => state.entries.sections;
export const terms = state => state.entries.terms;
export const selectedCourses = state => state.frontEnd.selectedCourses;
export const selectedTermIdx = state => state.frontEnd.selectedTerm;
export const courseFilter = state => state.frontEnd.courseFilter;

// castTime(String) :: "%H:%M:%S"
// Cast input value to formatted time string.
// Returns 00:00:00 if input is invalid.
function castTime(t) {
  let date = new Date(0, 0, 0, ...t.split(":"));
  if (isNaN(date.getTime())) {
    date = new Date(0, 0, 0, 0, 0, 0);
  }
  return moment(date).format("HH:mm:ss");
}

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
  courseFilter,
  (courses, {courseName}) => courses.filter(
    course => {
      if (courseName == false) {
        return true;
      }

      const regex = new RegExp(courseName, "i");

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
  courses,
  endTime,
  filteredCourses,
  sections,
  selectedCourses,
  selectedTerm,
  selectedTermIdx,
  startTime,
  terms,
  worklist,
  worklistIds
});
