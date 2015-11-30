import {createAction} from "redux-actions";
import action from "../actions";
import * as s from "../selectors";

const joinedChannel = createAction("JOINED_CHANNEL");
const joiningChannel = createAction("JOINING_CHANNEL");
const setSections = createAction("SET_SECTIONS");
const setTerms = createAction("SET_TERMS");

function refreshSchedule() {
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

function getTerms() {
  return (dispatch, getState) => {
    const channel = s.channel(getState());

    const onOk = ({payload}) => {
      dispatch(setTerms(payload));
      dispatch(action.changeTerm(payload[0].id));
    };

    channel.
      push("terms:search").
      receive("ok", onOk);
  };
}

function joinChannel(channel) {
  return dispatch => {
    const onOk = () => {
      dispatch(joinedChannel());
      dispatch(getTerms());
    };

    dispatch(joiningChannel(channel));

    channel.
      join().
      receive(
        "ok",
        onOk
      );
  };
}

export default {
  refreshSchedule,
  getTerms,
  joinChannel
};
