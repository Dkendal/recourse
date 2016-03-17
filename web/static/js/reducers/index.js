import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import frontEnd from "./frontEnd";
import data from "./data";
import entries from "./entries";
import focusedSection from "./focusedSection";
import timetable from "./timetable";
import settings from "./settings";
import page from "./page";

const reducer = combineReducers(
  {
    data,
    entries,
    focusedSection,
    frontEnd,
    page,
    settings,
    timetable,
  }
);

export default reducer;
