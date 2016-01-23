import {combineReducers} from "redux";
import {List} from "immutable";
import {handleActions} from "redux-actions";
import {parseTime, timeToNumber} from "lib/time";

const processT = (t) => timeToNumber(parseTime(t));

const defaultMinEndHour = {hours: 17};
const endHour = handleActions(
  {
    SET_END_HOUR:
      (state, {payload}) => payload || defaultMinEndHour
  },
  defaultMinEndHour
);

const defaultMaxStartHour = {hours: 8}
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
