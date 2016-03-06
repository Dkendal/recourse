import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import frontEnd from "./frontEnd";
import schema from "./schema";
import entries from "./entries";

const reducer = combineReducers(
  {
    entries,
    frontEnd,
    schema,
  }
);

export default reducer;
