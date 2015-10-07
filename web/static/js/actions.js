export const ADD_COURSE = "ADD_COURSE";
export const SET_COURSES = "SET_COURSES";

export function setCourses(courses) {
  return {type: SET_COURSES, courses};
}

export function addCourse(id) {
  return {type: ADD_COURSE, id};
}
