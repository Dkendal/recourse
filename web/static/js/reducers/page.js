import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

const ready = handleActions({
  PAGE_READY: (state, action) => true,
}, false);

export default combineReducers({
  ready
});
