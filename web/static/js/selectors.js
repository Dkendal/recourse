import {createSelector, createStructuredSelector} from "reselect";

const coursesSelector = state => state.entries.courses;

const selectedCoursesSelector = state => state.frontEnd.selectedCourses;

const worklistSelector = createSelector(
  coursesSelector,
  selectedCoursesSelector,
  (courses, selectedCourses) => {
    return courses.filter(course => {
      return selectedCourses.has(course.id);
    });
  }
);

export const select = createStructuredSelector(
  { courses: coursesSelector
  , worklist: worklistSelector
  }
);
