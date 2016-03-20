import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { LOAD } from "redux-storage";

const start = handleActions({
  SET_SETTINGS_TIMETABLE_START: (state, {payload}) => {
    return payload;
  },
  [LOAD]: (state, { payload }) => {
    return new Date(payload.settings.timetable.start);
  },
}, new Date(0, 0, 0, 8));

const end = handleActions({
  SET_SETTINGS_TIMETABLE_END: (state, {payload}) => {
    return payload;
  },
  [LOAD]: (state, { payload }) => {
    return new Date(payload.settings.timetable.end);
  },
}, new Date(0, 0, 0, 17));

export default combineReducers({
  start,
  end,
});
