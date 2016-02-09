import {combineReducers} from "redux";
import {List} from "immutable";
import {handleActions} from "redux-actions";

const defaultMinScheduleEndTime = "17:00:00";
const scheduleEndTime = handleActions(
  {
    SET_SCHEDULE_END_TIME:
      (state, {payload}) => payload || defaultMinScheduleEndTime
  },
  defaultMinScheduleEndTime
);

const defaultMaxScheduleStartTime = "08:00:00";
const scheduleStartTime = handleActions(
  {
    SET_SCHEDULE_START_TIME:
      (state, {payload}) => payload || defaultMaxScheduleStartTime
  },
  defaultMaxScheduleStartTime
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
  scheduleStartTime,
  scheduleEndTime,
  sections,
  terms
});

export default entries;
