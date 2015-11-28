import {createAction} from "redux-actions";
import * as s from "./selectors";

export const filterCourses = createAction("FILTER_COURSES");

const joinedChannel = createAction("JOINED_CHANNEL");
const joiningChannel = createAction("JOINING_CHANNEL");
const selectCourse = createAction("SELECT_COURSE", ({id}) => id);
const deselectCourse = createAction("DESELECT_COURSE", ({id}) => id);
const setSections = createAction("SET_SECTIONS");

export function refreshSchedule() {
  return (dispatch, getState) => {
    const scheduleSettings = s.scheduleSettings(getState());
    const ids = s.worklistIds(getState());

    s.channel(getState()).
      push(
        "make_schedule",
        { course_ids: ids, settings: scheduleSettings }
      ).
      receive(
        "ok",
        ({payload}) => dispatch(setSections(payload))
      );
  };
}

export function setScheduleSettings({target: {value, name}}) {
  return (dispatch) => {
    return dispatch(createAction(`SET_${name}`)(value));
  };
}

export function changeTerm(term) {
  return (dispatch) => {
    dispatch(createAction("CHANGE_TERM")(term));
    dispatch(refreshSchedule());
  };
}

function updateSchedule(startAction) {
  return course => (dispatch) => {
    dispatch(startAction(course));
    dispatch(refreshSchedule());
  };
}

const addToSchedule = updateSchedule(selectCourse);
const removeFromSchedule = updateSchedule(deselectCourse);

export function toggleCourseSelection(course) {
  return (dispatch, getState) => {
    const ids = s.worklistIds(getState());

    if(ids.includes(course.id)) {
      return dispatch(removeFromSchedule(course));
    }
    return dispatch(addToSchedule(course));
  };
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
