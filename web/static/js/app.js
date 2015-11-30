import {compose, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import {Provider} from "react-redux";
import * as storage from "redux-storage";
import createEngine from "redux-storage/engines/localStorage";
import {decorators} from "redux-storage";
import React from "react";
import ReactDOM from "react-dom";
import Recourse from "./containers/Recourse";
import reducer from "./reducers";
import socket from "./socket";
import {joinChannel} from "./actions/channel";

let engine = createEngine("Recourse");

engine = decorators.filter(
  engine,
  [
    [],
    ["frontEnd"]
  ]
);

const storageMiddleware = storage.createMiddleware(engine);

const loggerMiddleware = createLogger();

const store = compose(
  applyMiddleware(
    thunkMiddleware,
    storageMiddleware,
    loggerMiddleware
  )
)(createStore)(storage.reducer(reducer));

const load = storage.createLoader(engine);
load(store);

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
