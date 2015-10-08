import {combineReducers} from "redux";
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

const reducer = combineReducers(
  { entries
  , frontEnd
  }
);

export default reducer;
