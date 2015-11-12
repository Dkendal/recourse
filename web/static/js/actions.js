import {createAction} from "redux-actions";
import {selectedCourses} from "./selectors";

export const DESELECT_COURSE = "DESELECT_COURSE";
export const deselectCourse = createAction(DESELECT_COURSE, ({id}) => id);

export const JOINED_CHANNEL = "JOINED_CHANNEL";
export const joinedChannel = createAction(JOINED_CHANNEL);

export const JOINING_CHANNEL = "JOINING_CHANNEL";
export const joiningChannel = createAction(JOINING_CHANNEL);

export const SELECT_COURSE = "SELECT_COURSE";
export const selectCourse = createAction(SELECT_COURSE, ({id}) => id);

export const SET_SECTIONS = "SET_SECTIONS";
function updateSchedule(startAction) {
  return channel => course => (dispatch, getState) => {
    const setSections = createAction(SET_SECTIONS);

    dispatch(startAction(course));

    const courseIds = selectedCourses(getState());

    channel
    .push("make_schedule", courseIds)
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
  return addToSchedule(channel)(course);
}

export const SET_COURSES = "SET_COURSES";
export function searchCourses(channel) {
  return (dispatch) => {
    const setCourses = createAction(SET_COURSES);

    channel
    .push("courses:search")
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

    channel
    .join()
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
