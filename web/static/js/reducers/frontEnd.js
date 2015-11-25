import {combineReducers} from "redux";
import {Set} from "immutable";
import {handleActions} from "redux-actions";

const initialState = {isFetching: false, didInvalidate: false};

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
  selectedCourses,
  courseFilter
});

export default frontEnd;
