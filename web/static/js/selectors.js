import {createSelector, createStructuredSelector} from "reselect";
import _ from "underscore";

export const channel = state => state.channel;
export const courses = state => state.entries.courses;
export const sections = state => state.entries.sections;
export const selectedCourses = state => state.frontEnd.selectedCourses;
export const courseFilter = state => state.frontEnd.courseFilter;

export const worklist = createSelector(
  courses,
  selectedCourses,
  (courses, selectedCourses) => courses.filter(
    ({id}) => selectedCourses.has(id))
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
  courses,
  worklist,
  filteredCourses,
  selectedCourses,
  channel,
  sections
});

export default select;
