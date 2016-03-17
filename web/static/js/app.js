import { compose, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import Recourse from "./containers/Recourse";
import socket from "./socket"
import { joinChannel, getTerms, refreshSchedule, pageReady } from "actions";
import configureStore from "./store/configureStore";

import "css/application";

const store = configureStore()

const dispatch = store.dispatch;

window.addEventListener("load", function(event) {
  console.log("loaded");
  dispatch(pageReady());
});

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Recourse />
    </Provider>
  </div>,
  document.getElementById("app"),
)

window.channel = socket.channel("schedules:planner", {});

dispatch(joinChannel()).
  then(_.flowRight(dispatch, getTerms)).
  then(_.flowRight(dispatch, refreshSchedule));
