import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import frontEnd from "./frontEnd";
import data from "./data";
import entries from "./entries";
import focusedSection from "./focusedSection";
import timetable from "./timetable";

const reducer = combineReducers(
  {
    entries,
    timetable,
    frontEnd,
    focusedSection,
    data,
  }
);

export default reducer;
