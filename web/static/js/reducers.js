import {combineReducers} from "redux";
import {Set, List} from "immutable";
import {ADD_COURSE, SET_COURSES} from "./actions";

const initialState = {
  selectedCourses: Set([]),
  courses: List([])
};

function selectedCourses(state=initialState.selectedCourses, action) {
  switch (action.type) {

  case ADD_COURSE:
    return state.add(action.id);

  default:
    return state;
  }
}

function courses(state=initialState.courses, action) {
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
