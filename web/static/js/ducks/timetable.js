import {combineReducers} from "redux";
import {handleActions} from "redux-actions";

const id = handleActions(
  {
    SET_TIMETABLE: (_, {payload}) => payload
  },
  null
)

const loaded = handleActions(
  {
    SET_TIMETABLE: (_, {payload}) => true,
    FETCHING_TIMETABLE: (_state, _payload) => false,
  },
  false
)

const reducer = combineReducers({
  loaded,
  id,
});

export default reducer;
