import {createSelector, createStructuredSelector} from "reselect";
import _ from "underscore";
import {List} from "immutable";

export const channel = state => state.channel;
export const sections = state => state.entries.sections;
export const terms = state => state.entries.terms;
export const selectedCourses = state => state.frontEnd.selectedCourses;
export const selectedTermId = state => state.frontEnd.selectedTerm;
export const courseFilter = state => state.frontEnd.courseFilter;

export const selectedTerm = createSelector(
  terms,
  selectedTermId,
  (terms, termId) => terms.find(({id}) => id === termId)
);

export const courses = createSelector(
  selectedTerm,
  (term) => term && term.courses || List()
);

export const worklist = createSelector(
  courses,
  selectedCourses,
  (courses, selectedCourses) => courses.filter(
    ({id}) => selectedCourses.has(id))
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

const select = createStructuredSelector({
  terms,
  selectedTerm,
  courses,
  worklist,
  worklistIds,
  filteredCourses,
  selectedCourses,
  channel,
  sections
});

export default select;
