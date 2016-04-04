import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import data from "./data";
import entries from "./entries";
import focusedSection from "./focusedSection";
import timetable from "./timetable";
import settings from "./settings";
import page from "./page";

export default combineReducers(
  {
    data,
    entries,
    focusedSection,
    page,
    settings,
    timetable,
  }
);
