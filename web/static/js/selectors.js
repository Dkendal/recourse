import {createSelector, createStructuredSelector} from "reselect";

const coursesSelector = state => state.courses;
const selectedCoursesSelector = state => state.selectedCourses;

const worklistSelector = createSelector(
  coursesSelector,
  selectedCoursesSelector,
  (courses, selectedCourses) => {
    return courses.filter(course => {
      return selectedCourses.has(course.id);
    });
  }
);

export const select = createStructuredSelector({
  courses: coursesSelector,
  worklist: worklistSelector
});
