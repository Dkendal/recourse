import { combineReducers } from "redux";
import timetable from "./timetable";
import courses from "./courses";
import search from "./search";
import terms from "./terms";

export default combineReducers({
  timetable,
  search,
  courses,
  terms,
});
