import {combineReducers} from "redux";
import {List} from "immutable";
import {handleActions} from "redux-actions";

const defaultMinEndHour = "17:00:00";
const endHour = handleActions(
  {
    SET_END_HOUR:
      (state, {payload}) => payload || defaultMinEndHour
  },
  defaultMinEndHour
);

const defaultMaxStartHour = "08:00:00";
const startHour = handleActions(
  {
    SET_START_HOUR:
      (state, {payload}) => payload || defaultMaxStartHour
  },
  defaultMaxStartHour
);

const sections = handleActions(
  {
    SET_SECTIONS:
      (state, {payload}) => List(payload)
  },
  List()
);

const terms = handleActions(
  {
    SET_TERMS:
      (state, {payload}) => List(payload)
  },
  List()
);

const entries = combineReducers({
  startHour,
  endHour,
  sections,
  terms
});

export default entries;
