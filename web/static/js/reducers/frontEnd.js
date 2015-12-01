import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import {LOAD} from "redux-storage";
import immutable, {Set} from "immutable";
import scheduleSettings from "./frontEnd/scheduleSettings";

function load(reducer, type, key) {
  return (state, action) => {
    switch (action.type) {
    case LOAD:
      try {
        return immutable[type](key(action.payload));
      }
      catch (_) {
        return key(state);
      }
      break;
    default:
      return reducer(state, action);
    }
  };
}

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

selectedCourses = load(selectedCourses, "Set", (payload) => payload.frontEnd.selectedCourses);

const courseFilter = handleActions(
  {
    FILTER_COURSES:
      (state, {payload}) => payload
  },
  {}
);

const frontEnd = combineReducers({
  selectedTerm,
  selectedCourses,
  courseFilter,
  scheduleSettings
});

export default frontEnd;
