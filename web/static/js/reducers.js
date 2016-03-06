import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import frontEnd from "./reducers/frontEnd";
import entries from "./reducers/entries";

const initialState = { state: "not connected" };

const reducer = combineReducers(
  {
    entries,
    frontEnd,
  }
);

export default reducer;
