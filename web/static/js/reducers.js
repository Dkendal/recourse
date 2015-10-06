import {combineReducers} from "redux";
import {ADD_COURSE, SET_COURSES} from "./actions";

function selectedCourses(state=[], action) {
  switch (action.type) {

  case ADD_COURSE:
    let clone = state.slice(0);
    clone.push(action.course);
    return clone;

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
