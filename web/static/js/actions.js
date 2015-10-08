import {createAction} from "redux-actions";

export const SELECT_COURSE = "SELECT_COURSE";
export const DESELECT_COURSE = "DESELECT_COURSE";
export const SET_COURSES = "SET_COURSES";
export const JOINING_CHANNEL = "JOINING_CHANNEL";

const setCourses = createAction(SET_COURSES);
export const selectCourse = createAction(SELECT_COURSE);
export const deselectCourse = createAction(DESELECT_COURSE);

export const joiningChannel = createAction(JOINING_CHANNEL);

export const addToSchedule = channel => {
  course => dispatch => {
    console.log("sup");
  }
}

export function joinChannel(channel) {
  return dispatch => {
    dispatch(joiningChannel(channel));

    channel.join()
    .receive("ok", resp => {
      dispatch(setCourses(resp));
    })
    .receive("error", resp => {
      console.log("Unable to join", resp);
    });
  };
}
