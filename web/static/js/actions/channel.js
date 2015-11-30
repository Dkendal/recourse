import {createAction} from "redux-actions";
import {changeTerm} from "../actions";

const joinedChannel = createAction("JOINED_CHANNEL");
const joiningChannel = createAction("JOINING_CHANNEL");

function getTerms(channel) {
  return (dispatch) => {
    const setTerms = createAction("SET_TERMS");
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
    dispatch(joiningChannel(channel));

    const onOk = () => {
      dispatch(joinedChannel());
      dispatch(getTerms(channel));
    };

    channel.
      join().
      receive("ok", onOk);
  };
}
