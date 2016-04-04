import {combineReducers} from "redux";
import {handleActions} from "redux-actions";

const selectedTerm = handleActions(
  {
    CHANGE_TERM:
      (state, {payload}) => payload
  },
  0
);

const frontEnd = combineReducers({
  selectedTerm,
});

export default frontEnd;
