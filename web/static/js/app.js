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

const store = compose(
  applyMiddleware(
    thunkMiddleware,
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
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

window.channel = socket.channel("schedules:planner", {});
dispatch(joinChannel()).
  then(_.compose(dispatch, getTerms)).
  then(_.compose(dispatch, refreshSchedule));
