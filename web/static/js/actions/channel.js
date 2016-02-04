import {createAction} from "redux-actions";
import * as s from "../selectors";
import _ from "underscore";

const joinedChannel = createAction("JOINED_CHANNEL");
const joiningChannel = createAction("JOINING_CHANNEL");
const setMaxEndHour = createAction("SET_END_HOUR");
const setSections = createAction("SET_SECTIONS");
const setMinStartHour = createAction("SET_START_HOUR");
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
    const scheduleSettings = s.scheduleSettings(getState());
    const ids = s.worklistIds(getState());

    const onSuccess = ({payload: {sections, earliestStartTime, latestEndTime}}) => {
      
      dispatch(setSections(sections));
      dispatch(setMinStartHour(earliestStartTime));
      dispatch(setMaxEndHour(latestEndTime));
    };

    const params = {
      course_ids: ids,
      settings: scheduleSettings
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
