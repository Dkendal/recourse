import {compose, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import {Provider} from "react-redux";

// Redux dev tools
import {devTools, persistState} from 'redux-devtools';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';

import React from "react";
import {List} from "immutable";
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
  ),
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)(reducer);

const channel = socket.channel("schedules:planner", {});

store.dispatch(joinChannel(channel));

React.render(
  <div>
    <Provider store={store}>
      {() => <Recourse />}
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  document.getElementById("app")
);
