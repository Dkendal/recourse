import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import immutable, {Set} from "immutable";
import scheduleSettings from "./scheduleSettings";
import timetable from "./timetable";

const selectedTerm = handleActions(
  {
    CHANGE_TERM:
      (state, {payload}) => payload
  },
  0
);

let selectedCourses = handleActions(
  {
    SELECT_COURSE:
      (state, {payload}) => state.add(payload),

    DESELECT_COURSE:
      (state, {payload}) => state.delete(payload)
  },
  Set([])
);

const courseFilter = handleActions(
  {
    FILTER_COURSES:
      (state, {payload}) => payload
  },
  {}
);

const frontEnd = combineReducers({
  timetable,
  selectedTerm,
  selectedCourses,
  courseFilter,
  scheduleSettings
});

export default frontEnd;
