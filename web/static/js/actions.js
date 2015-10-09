import {createAction} from "redux-actions";
import {selectedCourses} from "./selectors";

export const SELECT_COURSE = "SELECT_COURSE";
export const DESELECT_COURSE = "DESELECT_COURSE";
export const SET_COURSES = "SET_COURSES";
export const SET_SECTIONS = "SET_SECTIONS";
export const JOINING_CHANNEL = "JOINING_CHANNEL";
export const JOINED_CHANNEL = "JOINED_CHANNEL";

const setCourses = createAction(SET_COURSES);
const setSections = createAction(SET_SECTIONS);

export const selectCourse = createAction(SELECT_COURSE, ({id}) => id);
export const deselectCourse = createAction(DESELECT_COURSE, ({id}) => id);

export const joiningChannel = createAction(JOINING_CHANNEL);
export const joinedChannel = createAction(JOINED_CHANNEL);

function getCourseIds(getState) {
  return selectedCourses(getState());
}

function updateSchedule(startAction) {
  return channel => course => (dispatch, getState) => {
    dispatch(startAction(course));

    const courseIds = getCourseIds(getState);

    channel.push("make_schedule", courseIds)
    .receive(
      "ok",
      ({payload}) => {
        dispatch(setSections(payload));
      }
    )
    .receive(
      "error",
      resp => {
        console.log("make_schedule failed :(", resp);
      }
    );
  };
}

export const addToSchedule = updateSchedule(selectCourse);
export const removeFromSchedule = updateSchedule(deselectCourse);

export function toggleCourseSelection(channel, selectedCourses, course) {
  if(selectedCourses.has(course.id)) {
    return removeFromSchedule(channel)(course);
  }
  return addToSchedule(channel)(course)
}

export function searchCourses(channel) {
  return (dispatch) => {
    channel.push("courses:search")
    .receive(
      "ok",
      ({payload}) => {
        dispatch(setCourses(payload));
      }
    )
    .receive(
      "error",
      resp => {
        console.log("No response from server", resp);
        // TODO update front end
      }
    );
  };
}

export function joinChannel(channel) {
  return dispatch => {
    dispatch(joiningChannel(channel));

    channel.join()
    .receive(
      "ok",
      resp => {
        dispatch(joinedChannel());
        dispatch(searchCourses(channel));
      }
    )
    .receive(
      "error",
      resp => {
        console.log("Unable to join", resp);
        // TODO update front end
      }
    );
  };
}
