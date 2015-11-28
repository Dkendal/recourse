import {combineReducers} from "redux";
import {handleActions} from "redux-actions";

const startTime = handleActions(
  {
    SET_scheduleSettings_startTime:
      (state, {payload}) => payload
  },
  ""
);

const endTime = handleActions(
  {
    SET_scheduleSettings_endTime:
      (state, {payload}) => payload
  },
  ""
);

export default combineReducers({
  startTime,
  endTime
});
