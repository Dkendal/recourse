import {createSelector, createStructuredSelector} from "reselect";

const channel = state => state.channel;

const courses = state => state.entries.courses;

const selectedCourses = state => state.frontEnd.selectedCourses;

const worklist = createSelector(
  courses,
  selectedCourses,
  (courses, selectedCourses) => {
    return courses.filter(course => {
      return selectedCourses.has(course.id);
    });
  }
);

export const select = createStructuredSelector(
  { courses
  , worklist
  , channel
  }
);
