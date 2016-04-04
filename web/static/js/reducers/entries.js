import { combineReducers } from "redux";
import { List } from "immutable";
import { handleActions } from "redux-actions";

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
  sections,
  terms
});

export default entries;
