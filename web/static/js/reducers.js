import {combineReducers} from "redux";
import {Set, List} from "immutable";
import {ADD_COURSE, REMOVE_COURSE, SET_COURSES} from "./actions";

// State Shape
// ===========
//
// {
//   socket: {
//     channel: Channel
//     courses: {
//       isFetching: Bool,
//       didInvalidate: Bool
//     },
//     sections: {
//       isFetching: Bool,
//       didInvalidate: Bool
//     }
//   },
//   entries: {
//     courses: [Course],
//     sections: [Section]
//   }
//   frontEnd: {
//     selectedCourses: [Number]
//   }
// }

const socketInit = {isFetching: false, didInvalidate: false};

function channel(state = {}, action) {
  switch (action.type) {
  default:
    return state;
  }
}

function socketCourses(state = socketInit, action) {
  switch (action.type) {
  default:
    return state;
  }
}

function socketSections(state = socketInit, action) {
  switch (action.type) {
  default:
    return state;
  }
}

const socket = combineReducers({
  channel,
  courses: socketCourses,
  sections: socketSections
});


function entriesCourses(state = List(), action) {
  switch (action.type) {
  default:
    return state;
  }

}

function entriesSections(state = List(), action) {
  switch (action.type) {
  default:
    return state;
  }
}

const entries = combineReducers({
  courses: entriesCourses,
  sections: entriesSections
});

function selectedCourses(state = Set(), action) {
  switch (action.type) {
  default:
    return state;
  }
}

const frontEnd = combineReducers({
  selectedCourses
});

const reducer = combineReducers({
  socket,
  entries,
  frontEnd
});

export default reducer;
