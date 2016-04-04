import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

const text = handleActions({
  SET_SETTINGS_SEARCH_TEXT: (state, { payload }) => {
    return payload;
  },
}, "");

export default combineReducers({
  text,
});
