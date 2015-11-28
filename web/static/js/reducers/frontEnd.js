import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import {Set} from "immutable";
import scheduleSettings from "./frontEnd/scheduleSettings";

const initialState = {isFetching: false, didInvalidate: false};

const selectedTerm = handleActions(
  {
    CHANGE_TERM:
      (state, {payload}) => payload
  },
  (state) => state
);

const sections = handleActions(
  {},
  initialState
);

const selectedCourses = handleActions(
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
  sections,
  selectedTerm,
  selectedCourses,
  courseFilter,
  scheduleSettings
});

export default frontEnd;
