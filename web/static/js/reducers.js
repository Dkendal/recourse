import {combineReducers} from "redux";
import {SELECT_COURSE, SET_COURSES} from "./actions";

function selectedCourses(state=[], action) {
  switch (action.type) {

  case SELECT_COURSE:
    return [];

  default:
    return state;
  }
}

function courses(state=[], action) {
  switch (action.type) {

  case SET_COURSES:
    return action.courses;

  default:
    return state;
  }
}

const recourse = combineReducers({
  courses,
  selectedCourses
});

export default recourse;
