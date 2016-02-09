import {createAction} from "redux-actions";
import * as s from "../selectors";
import _ from "underscore";

const joinedChannel = createAction("JOINED_CHANNEL");
const joiningChannel = createAction("JOINING_CHANNEL");
const setMaxScheduleEndTime = createAction("SET_SCHEDULE_END_TIME");
const setSections = createAction("SET_SECTIONS");
const setMinScheduleStartTime = createAction("SET_SCHEDULE_START_TIME");
const setTerms = createAction("SET_TERMS");

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
    const channel = s.channel(getState());
    const settings = s.scheduleParams(getState());
    const ids = s.worklistIds(getState());

    const onSuccess = ({payload: {sections, earliestStartTime, latestEndTime}}) => {
      dispatch(setSections(sections));
      dispatch(setMinScheduleStartTime(earliestStartTime));
      dispatch(setMaxScheduleEndTime(latestEndTime));
    };

    const params = {
      course_ids: ids,
      settings: settings
    };

    const push = channel.
      push("make_schedule", params);

    return asPromise(push, onSuccess);
  };
}

function getTerms() {
  return (dispatch, getState) => {
    const channel = s.channel(getState());
    const onSuccess = _.compose(dispatch, setTerms, x => x.payload);
    return asPromise(channel.push("terms:search"), onSuccess);
  };
}

function joinChannel(channel) {
  return (dispatch) => {
    const onSuccess = _.compose(dispatch, joinedChannel);
    dispatch(joiningChannel(channel));
    return asPromise(channel.join(), onSuccess);
  };
}

export default {
  refreshSchedule,
  getTerms,
  joinChannel
};
