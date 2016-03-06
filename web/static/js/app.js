import {compose, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";
import Recourse from "./containers/Recourse";
import reducer from "./reducers";
import socket from "./socket";
import {joinChannel, getTerms, refreshSchedule} from "./actions/channel";

import "css/application";

const channel = socket.channel("schedules:planner", {});

const store = compose(
  applyMiddleware(
    thunkMiddleware,
  )
)(createStore)(reducer);

const dispatch = store.dispatch;

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Recourse />
    </Provider>
  </div>,
  document.getElementById("app")
)

dispatch(joinChannel(channel)).
  then(_.compose(dispatch, getTerms)).
  then(_.compose(dispatch, refreshSchedule));
