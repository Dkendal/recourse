import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import time from "lib/time";
import timetable from "./timetable";
import courses from "./courses";

const text = handleActions({
  SET_SETTINGS_SEARCH_TEXT: (state, { payload }) => {
    return payload;
  },
}, "");

const search = combineReducers({
  text,
});

export default combineReducers({
  timetable,
  search,
  courses,
});
