import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

const SET = "SET_SETTINGS_TERMS_ID";

const id = handleActions({
  [SET]: (state, {payload}) => payload
}, 0)

export default combineReducers({
  id,
});
