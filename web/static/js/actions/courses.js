import {createAction} from "redux-actions";
import a from "../actions";
import * as s from "../selectors";

const selectCourse = createAction("SELECT_COURSE", ({id}) => id);
const deselectCourse = createAction("DESELECT_COURSE", ({id}) => id);

const addToSchedule = updateSchedule(selectCourse);
const removeFromSchedule = updateSchedule(deselectCourse);

function updateSchedule(startAction) {
  return course => (dispatch) => {
    dispatch(startAction(course));
    dispatch(a.refreshSchedule());
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
  toggleCourseSelection
};
