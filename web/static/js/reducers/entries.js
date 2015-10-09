import {combineReducers} from "redux";
import {Set, List} from "immutable";
import {handleActions} from "redux-actions";
import {SET_COURSES, SET_SECTIONS} from "../actions";

const courses = handleActions(
  { SET_COURSES: (state, {payload}) => List(payload)
  }
  , List()
);

const sections = handleActions(
  { SET_SECTIONS: (state, {payload}) => List(payload)
  }
  , List()
);

const entries = combineReducers(
  { courses
  , sections
  }
);

export default entries;
