import {compose, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import Recourse from "./containers/Recourse";
import reducer from "./reducers";
import {joinChannel} from "./actions";

import socket from "./socket";

// Now that you are connected, you can join channels with a topic:
const loggerMiddleware = createLogger();

const store = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)(createStore)(reducer);

const channel = socket.channel("schedules:planner", {});

store.dispatch(joinChannel(channel));

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Recourse />
    </Provider>
  </div>,
  document.getElementById("app")
);
