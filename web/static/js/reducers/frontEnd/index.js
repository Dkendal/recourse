import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import Immutable, {Set} from "immutable";
import scheduleSettings from "./scheduleSettings";

const selectedTerm = handleActions(
  {
    CHANGE_TERM:
      (state, {payload}) => payload
  },
  0
);

const frontEnd = combineReducers({
  selectedTerm,
  scheduleSettings,
});

export default frontEnd;
