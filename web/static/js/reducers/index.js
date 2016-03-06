import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import frontEnd from "./frontEnd";
import entries from "./entries";

const reducer = combineReducers(
  {
    entries,
    frontEnd,
  }
);

export default reducer;
