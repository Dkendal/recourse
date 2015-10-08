import {combineReducers} from "redux";
import {Set, List} from "immutable";
import {handleActions} from "redux-actions";
import {SET_COURSES} from "../actions";

const courses = handleActions(
  { SET_COURSES: (state, {payload}) => List(payload)
  }
  , List()
);

const sections = handleActions(
  {},
  List()
);

const entries = combineReducers(
  { courses
  , sections
  }
);

export default entries;
