import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { LOAD } from "redux-storage";
import { Set } from "immutable";

const selected = handleActions({
  TOGGLE_SETTINGS_COURSES_SELECTED: (state, { payload }) => {
    return state.has(payload) ? state.delete(payload) : state.add(payload);
  },
  [LOAD]: (state, { payload }) => {
    return payload &&
    payload.settings &&
    payload.settings.courses &&
    payload.settings.courses.selected &&
    Set(payload.settings.courses.selected) ||
    Set();
  }
}, Set());

export default combineReducers({
  selected,
});
