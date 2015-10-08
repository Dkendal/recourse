import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import {JOINING_CHANNEL} from "./actions";
import frontEnd from "./reducers/frontEnd";
import entries from "./reducers/entries";

// State Shape
// ===========
//
// {
//   entries: {
//     courses: [Course],
//     sections: [Section]
//   }
//   frontEnd: {
//     selectedCourses: [Number]
//     courses: {
//       isFetching: Bool,
//       didInvalidate: Bool
//     },
//     sections: {
//       isFetching: Bool,
//       didInvalidate: Bool
//     }
//   }
// }
const initialState = { state: "not connected" };

const channel = handleActions(
  { JOINING_CHANNEL: (state, {payload}) => payload
  }
  , initialState
)

const reducer = combineReducers(
  { entries
  , frontEnd
  , channel
  }
);

export default reducer;
