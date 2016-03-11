import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import frontEnd from "./frontEnd";
import data from "./data";
import entries from "./entries";
import focusedSection from "./focusedSection";

const reducer = combineReducers(
  {
    entries,
    frontEnd,
    focusedSection,
    data,
  }
);

export default reducer;
