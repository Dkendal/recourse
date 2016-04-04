import {createAction} from "redux-actions";
import selectors from "../selectors";
import { asPromise } from "lib/promise";
import _ from "lodash";

const joinedChannel = createAction("JOINED_CHANNEL");
const setMaxScheduleEndTime = createAction("SET_SCHEDULE_END_TIME");
const setMinScheduleStartTime = createAction("SET_SCHEDULE_START_TIME");
const setSections = createAction("SET_SECTIONS");
const setTerms = createAction("SET_TERMS");
const setTimetable = createAction("SET_TIMETABLE");
const fetchingTimetable = createAction("FETCHING_TIMETABLE");
const sync = createAction("SYNC");

function refreshSchedule() {
  return (dispatch, getState) => {
    const memo = selectors(getState());

    dispatch(fetchingTimetable());

    const onSuccess = ({payload: { timetable }}) => {
      dispatch(sync(timetable));
      dispatch(setTimetable(timetable.data.id));
    };

    const params = {
      course_ids: memo.worklistIds,
      settings: memo.settings.timetable.params,
    };

    const push = window.channel.push("make_schedule", params);

    return asPromise(push, onSuccess);
  };
}

function getTerms() {
  return (dispatch, getState) => {
    const onSuccess = _.flowRight(dispatch, setTerms, x => x.payload);
    return asPromise(window.channel.push("terms:search"), onSuccess);
  };
}

function joinChannel() {
  return (dispatch) => {
    const onSuccess = _.flowRight(dispatch, joinedChannel);
    return asPromise(window.channel.join(), onSuccess);
  };
}

export default {
  refreshSchedule,
  getTerms,
  joinChannel
};
