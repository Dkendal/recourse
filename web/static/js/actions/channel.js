import {createAction} from "redux-actions";
import * as s from "../selectors";
import {compose} from "underscore";

const joinedChannel = createAction("JOINED_CHANNEL");
const joiningChannel = createAction("JOINING_CHANNEL");
const setSections = createAction("SET_SECTIONS");
const setTerms = createAction("SET_TERMS");

const getPayload = x => x.payload;

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
    const onSuccess = compose(dispatch, setSections, getPayload);

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
    const onSuccess = compose(dispatch, setTerms, getPayload);
    return asPromise(channel.push("terms:search"), onSuccess);
  };
}

function joinChannel(channel) {
  return (dispatch) => {
    const onSuccess = compose(dispatch, joinedChannel);
    dispatch(joiningChannel(channel));
    return asPromise(channel.join(), onSuccess);
  };
}

export default {
  refreshSchedule,
  getTerms,
  joinChannel
};
