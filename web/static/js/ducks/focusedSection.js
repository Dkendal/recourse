import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

const id = handleActions({
  SET_FOCUSED_SECTION: (state, { payload }) => payload,
},
null);

const visible = handleActions({
  HIDE_FOCUSED_SECTION: () => false,
  SET_FOCUSED_SECTION: () => true,
},
false);

const reducer = combineReducers({
  id,
  visible,
});

export default reducer;
