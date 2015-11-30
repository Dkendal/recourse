import {createAction} from "redux-actions";
import {changeTerm} from "../actions";
import * as s from "../selectors";

const joinedChannel = createAction("JOINED_CHANNEL");
const joiningChannel = createAction("JOINING_CHANNEL");
const setTerms = createAction("SET_TERMS");

export function getTerms() {
  return (dispatch, getState) => {
    const channel = s.channel(getState());

    const onOk = ({payload}) => {
      dispatch(setTerms(payload));
      dispatch(changeTerm(payload[0].id));
    };

    channel.
      push("terms:search").
      receive("ok", onOk);
  };
}

export function joinChannel(channel) {
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
