import {createAction} from "redux-actions";
import {selectedCourses} from "./selectors";

export const joinedChannel = createAction("JOINED_CHANNEL");
export const joiningChannel = createAction("JOINING_CHANNEL");
export const filterCourses = createAction("FILTER_COURSES");
export const selectCourse = createAction("SELECT_COURSE", ({id}) => id);
export const deselectCourse = createAction("DESELECT_COURSE", ({id}) => id);

function updateSchedule(startAction) {
  return channel => course => (dispatch, getState) => {
    const setSections = createAction("SET_SECTIONS");

    dispatch(startAction(course));

    const courseIds = selectedCourses(getState());

    channel.
      push("make_schedule", courseIds).
      receive(
        "ok",
        ({payload}) => {
          dispatch(setSections(payload));
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

export function searchCourses(channel) {
  return (dispatch) => {
    const setCourses = createAction("SET_COURSES");

    channel.
      push("courses:search").
      receive(
        "ok",
        ({payload}) => {
          dispatch(setCourses(payload));
        }
      );
  };
}

export function joinChannel(channel) {
  return dispatch => {
    dispatch(joiningChannel(channel));

    channel.
      join().
      receive(
        "ok",
        () => {
          dispatch(joinedChannel());
          dispatch(searchCourses(channel));
        }
      );
  };
}
