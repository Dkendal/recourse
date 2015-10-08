import {combineReducers} from "redux";
import {Set, List} from "immutable";
import {handleActions} from "redux-actions";
import {SELECT_COURSE, DESELECT_COURSE} from "../actions";

const initialState = {isFetching: false, didInvalidate: false};

const courses = handleActions(
  {},
  initialState
);

const sections = handleActions(
  {},
  initialState
);

const selectedCourses = handleActions(
  { SELECT_COURSE: (state, {payload}) => state.add(payload)
  , DESELECT_COURSE: (state, {payload}) => state.delete(payload)
  }
  , Set([])
);

const frontEnd = combineReducers(
  { courses
  , sections
  , selectedCourses
  }
);

export default frontEnd;
