import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { LOAD } from "redux-storage";
import { Set } from "immutable";
import time from "lib/time";

const start = handleActions({
  SET_SETTINGS_TIMETABLE_START: (state, {payload}) => {
    return time.parseTime(payload);
  }
}, new Date(0, 0, 0, 8));

const end = handleActions({
  SET_SETTINGS_TIMETABLE_END: (state, {payload}) => {
    return time.parseTime(payload);
  },
}, new Date(0, 0, 0, 17));

const timetable = combineReducers({
  start,
  end,
});

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
