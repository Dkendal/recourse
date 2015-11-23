import {createAction} from "redux-actions";
import {selectedCourses} from "./selectors";

export const filterCourses = createAction("FILTER_COURSES");

const joinedChannel = createAction("JOINED_CHANNEL");
const joiningChannel = createAction("JOINING_CHANNEL");
const selectCourse = createAction("SELECT_COURSE", ({id}) => id);
const deselectCourse = createAction("DESELECT_COURSE", ({id}) => id);
const setSections = createAction("SET_SECTIONS");
const setCourses = createAction("SET_COURSES");

function updateSchedule(startAction) {
  return channel => course => (dispatch, getState) => {

    dispatch(startAction(course));

    const courseIds = selectedCourses(getState());

    const onOk = ({payload}) => dispatch(setSections(payload));

    channel.
      push("make_schedule", courseIds).
      receive("ok", onOk);
  };
}

const addToSchedule = updateSchedule(selectCourse);
const removeFromSchedule = updateSchedule(deselectCourse);

export function toggleCourseSelection(channel, selectedCourses, course) {
  if(selectedCourses.has(course.id)) {
    return removeFromSchedule(channel)(course);
  }
  return addToSchedule(channel)(course);
}

export function searchCourses(channel) {
  return (dispatch) => {
    const onOk = ({payload}) => dispatch(setCourses(payload));

    channel.
      push("courses:search").
      receive("ok", onOk);
  };
}

export function joinChannel(channel) {
  return dispatch => {
    dispatch(joiningChannel(channel));

    const onOk = () => {
      dispatch(joinedChannel());
      dispatch(searchCourses(channel));
    };

    channel.
      join().
      receive("ok", onOk);
  };
}
