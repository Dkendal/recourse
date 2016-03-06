import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import frontEnd from "./frontEnd";
import data from "./data";
import entries from "./entries";

const reducer = combineReducers(
  {
    entries,
    frontEnd,
    data,
  }
);

export default reducer;
