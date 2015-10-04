export const SELECT_COURSE = "SELECT_COURSE";
export const SET_COURSES = "SET_COURSES";

export function setCourses(courses) {
  return {type: SET_COURSES, courses};
}

export function selectCourse(idx) {
  return {type: SELECT_COURSE, idx};
}
