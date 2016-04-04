import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import time from "lib/time";
import timetable from "./timetable";
import courses from "./courses";
import search from "./search";

export default combineReducers({
  timetable,
  search,
  courses,
});
