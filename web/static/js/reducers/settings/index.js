import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { LOAD } from "redux-storage";
import { Set } from "immutable";
import time from "lib/time";
import timetable from "./timetable";

const text = handleActions({
  SET_SETTINGS_SEARCH_TEXT: (state, { payload }) => {
    return payload;
  },
}, "");

const search = combineReducers({
  text,
});

const selected = handleActions({
  TOGGLE_SETTINGS_COURSES_SELECTED: (state, { payload }) => {
    return state.has(payload) ? state.delete(payload) : state.add(payload);
  },
  [LOAD]: (state, { payload }) => {
    return payload &&
    payload.settings &&
    payload.settings.courses &&
    payload.settings.courses.selected &&
    Set(payload.settings.courses.selected) ||
    Set();
  }
}, Set());

const courses = combineReducers({
  selected,
});

export default combineReducers({
  timetable,
  search,
  courses,
});
