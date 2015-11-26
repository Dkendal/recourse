import {createAction} from "redux-actions";
import {worklist} from "./selectors";

export const filterCourses = createAction("FILTER_COURSES");
export const changeTerm = createAction("CHANGE_TERM");

const joinedChannel = createAction("JOINED_CHANNEL");
const joiningChannel = createAction("JOINING_CHANNEL");
const selectCourse = createAction("SELECT_COURSE", ({id}) => id);
const deselectCourse = createAction("DESELECT_COURSE", ({id}) => id);
const setSections = createAction("SET_SECTIONS");

function updateSchedule(startAction) {
  return channel => course => (dispatch, getState) => {

    dispatch(startAction(course));

    const courseIds = worklist(getState()).map(x => x.id);

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

export function searchTerms(channel) {
  return (dispatch) => {
    const setTerms = createAction("SET_TERMS");
    const onOk = ({payload}) => {
      dispatch(setTerms(payload));
      dispatch(changeTerm(payload[0].id));
    };

    channel.
      push("terms:search").
      receive("ok", onOk);
  };
}

export function joinChannel(channel) {
  return dispatch => {
    dispatch(joiningChannel(channel));

    const onOk = () => {
      dispatch(joinedChannel());
      dispatch(searchTerms(channel));
    };

    channel.
      join().
      receive("ok", onOk);
  };
}
