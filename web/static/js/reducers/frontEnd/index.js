import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import Immutable, {Set} from "immutable";
import scheduleSettings from "./scheduleSettings";

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
      (state, {payload}) => state.delete(payload),
  },
  Set([])
);

const frontEnd = combineReducers({
  selectedTerm,
  selectedCourses,
  scheduleSettings,
});

export default frontEnd;
