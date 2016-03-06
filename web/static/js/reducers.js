import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import frontEnd from "./reducers/frontEnd";
import entries from "./reducers/entries";

const initialState = { state: "not connected" };

const channel = handleActions(
  {
    JOINING_CHANNEL: (state, {payload}) => null
  },
  initialState
);

const reducer = combineReducers(
  {
    entries,
    frontEnd,
    channel
  }
);

export default reducer;
