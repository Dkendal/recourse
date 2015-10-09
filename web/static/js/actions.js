import {createAction} from "redux-actions";
import {worklist} from "./selectors";

export const SELECT_COURSE = "SELECT_COURSE";
export const DESELECT_COURSE = "DESELECT_COURSE";
export const SET_COURSES = "SET_COURSES";
export const SET_SECTIONS = "SET_SECTIONS";
export const JOINING_CHANNEL = "JOINING_CHANNEL";

const setCourses = createAction(SET_COURSES);
const setSections = createAction(SET_SECTIONS);

export const selectCourse = createAction(SELECT_COURSE, ({id}) => id);
export const deselectCourse = createAction(DESELECT_COURSE, ({id}) => id);

export const joiningChannel = createAction(JOINING_CHANNEL);

function getCourseIds(getState) {
  return worklist(getState()).map(({id}) => id);
}

function updateSchedule(startAction) {
  return channel => course => (dispatch, getState) => {
    dispatch(startAction(course));

    const courseIds = getCourseIds(getState);

    channel.push("make_schedule", courseIds)
    .receive("ok", ({payload}) => {
      dispatch(setSections(payload));
    })
    .receive("error", resp => {
      console.log("make_schedule failed :(", resp);
    });
  };
}

export const addToSchedule = updateSchedule(selectCourse);
export const removeFromSchedule = updateSchedule(deselectCourse);

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
