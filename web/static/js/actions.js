import {createAction} from "redux-actions";

export const SELECT_COURSE = "SELECT_COURSE";
export const DESELECT_COURSE = "DESELECT_COURSE";
export const SET_COURSES = "SET_COURSES";

const setCourses = createAction(SET_COURSES);
export const selectCourse = createAction(SELECT_COURSE);
export const deselectCourse = createAction(DESELECT_COURSE);

export function joinChannel(channel) {
  return dispatch => {
    channel.join()
    .receive("ok", resp => {
      dispatch(setCourses(resp));
    })
    .receive("error", resp => {
      console.log("Unable to join", resp);
    });
  };
}
