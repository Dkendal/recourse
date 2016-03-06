import {createAction} from "redux-actions";
import * as s from "../selectors";
import _ from "underscore";

const joinedChannel = createAction("JOINED_CHANNEL");
const setMaxScheduleEndTime = createAction("SET_SCHEDULE_END_TIME");
const setMinScheduleStartTime = createAction("SET_SCHEDULE_START_TIME");
const setSections = createAction("SET_SECTIONS");
const setTerms = createAction("SET_TERMS");
const setTimetable = createAction("SET_TIMETABLE");
const fetchingTimetable = createAction("FETCHING_TIMETABLE");
const sync = createAction("SYNC");

function asPromise(push, callback) {
  const promise = (resolve, reject) => {
    const onOk = (response) => {
      callback(response);
      return resolve();
    };

    const onError = () => {
      return reject();
    };

    push.
      receive("ok", onOk).
      receive("error", onError);
  };

  return new Promise(promise);
}

function refreshSchedule() {
  return (dispatch, getState) => {
    const settings = s.scheduleParams(getState());
    const ids = s.worklistIds(getState());

    dispatch(fetchingTimetable());

    const onSuccess = ({payload: {schedule, earliestStartTime, latestEndTime, ...rest}}) => {
      dispatch(sync(rest.timetable));
      dispatch(setTimetable(rest.timetable.data.id));

      // TODO remove these
      dispatch(setSections(schedule));
      dispatch(setMinScheduleStartTime(earliestStartTime));
      dispatch(setMaxScheduleEndTime(latestEndTime));
    };

    const params = {
      course_ids: ids,
      settings: settings
    };

    const push = window.channel.push("make_schedule", params);

    return asPromise(push, onSuccess);
  };
}

function getTerms() {
  return (dispatch, getState) => {
    const onSuccess = _.compose(dispatch, setTerms, x => x.payload);
    return asPromise(window.channel.push("terms:search"), onSuccess);
  };
}

function joinChannel() {
  return (dispatch) => {
    const onSuccess = _.compose(dispatch, joinedChannel);
    return asPromise(window.channel.join(), onSuccess);
  };
}

export default {
  refreshSchedule,
  getTerms,
  joinChannel
};
