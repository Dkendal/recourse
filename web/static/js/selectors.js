import {createSelector, createStructuredSelector} from "reselect";

export const channel = state => state.channel;
export const courses = state => state.entries.courses;
export const sections = state => state.entries.sections;
export const selectedCourses = state => state.frontEnd.selectedCourses;

export const worklist = createSelector(
  courses,
  selectedCourses,
  (courses, selectedCourses) => courses.filter(
    ({id}) => selectedCourses.has(id))
);

const select = createStructuredSelector(
  { courses
  , worklist
  , channel
  , sections
  }
);

export default select;
