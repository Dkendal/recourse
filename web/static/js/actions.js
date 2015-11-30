import {createAction} from "redux-actions";
import * as s from "./selectors";

export const filterCourses = createAction("FILTER_COURSES");

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

const addToSchedule = updateSchedule(selectCourse);
const removeFromSchedule = updateSchedule(deselectCourse);

function updateSchedule(startAction) {
  return course => (dispatch) => {
    dispatch(startAction(course));
    dispatch(refreshSchedule());
  };
}

export function toggleCourseSelection(course) {
  return (dispatch, getState) => {
    const ids = s.worklistIds(getState());

    if(ids.includes(course.id)) {
      return dispatch(removeFromSchedule(course));
    }
    return dispatch(addToSchedule(course));
  };
}
