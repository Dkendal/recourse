import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import {Provider} from "react-redux";
import React from "react";
import {List} from "immutable";
import Recourse from "./containers/Recourse";
import recourse from "./reducers";
import {setCourses} from "./actions";

import socket from "./socket";

// Now that you are connected, you can join channels with a topic:
const channel = socket.channel("schedules:planner", {});

const loggerMiddleware = createLogger();

const store = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)(recourse);

channel.join().
  receive("ok", resp => {
    store.dispatch(setCourses(List(resp)));
  }).

  receive("error", resp => {
    console.log("Unable to join", resp);
  });

React.render(
  <Provider store={store}>
    {() => <Recourse />}
  </Provider>,
  document.getElementById("app")
);
