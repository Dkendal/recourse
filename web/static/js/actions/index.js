import {createAction} from "redux-actions";
import channelActions from "./channel";
import courseActions from "./courses";

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

export default {
  ...channelActions,
  ...courseActions,
  changeTerm,
  filterCourses,
  setScheduleSettings
};