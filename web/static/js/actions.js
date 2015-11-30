import {createAction} from "redux-actions";
import channelActions from "./actions/channel";
import * as s from "./selectors";

const selectCourse = createAction("SELECT_COURSE", ({id}) => id);
const deselectCourse = createAction("DESELECT_COURSE", ({id}) => id);

const addToSchedule = updateSchedule(selectCourse);
const removeFromSchedule = updateSchedule(deselectCourse);

const filterCourses = createAction("FILTER_COURSES");

function setScheduleSettings({target: {value, name}}) {
  return (dispatch) => {
    return dispatch(createAction(`SET_${name}`)(value));
  };
}

function changeTerm(term) {
  return (dispatch) => {
    dispatch(createAction("CHANGE_TERM")(term));
    dispatch(channelActions.refreshSchedule());
  };
}

function updateSchedule(startAction) {
  return course => (dispatch) => {
    dispatch(startAction(course));
    dispatch(channelActions.refreshSchedule());
  };
}

function toggleCourseSelection(course) {
  return (dispatch, getState) => {
    const ids = s.worklistIds(getState());

    if(ids.includes(course.id)) {
      return dispatch(removeFromSchedule(course));
    }
    return dispatch(addToSchedule(course));
  };
}

export default {
  ...channelActions,
  changeTerm,
  filterCourses,
  setScheduleSettings,
  toggleCourseSelection
};
