import {compose, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import {Provider} from "react-redux";
import * as storage from "redux-storage";
import createEngine from "redux-storage/engines/localStorage";
import {decorators} from "redux-storage";
import React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";
import Recourse from "./containers/Recourse";
import reducer from "./reducers";
import socket from "./socket";
import {joinChannel, getTerms, refreshSchedule} from "./actions/channel";

const channel = socket.channel("schedules:planner", {});
let engine = createEngine("Recourse");
const loggerMiddleware = createLogger();

engine = decorators.filter(
  engine,
  [
    [],
    ["frontEnd"]
  ]
);

const storageMiddleware = storage.createMiddleware(engine);

const store = compose(
  applyMiddleware(
    thunkMiddleware,
    storageMiddleware,
    // loggerMiddleware
  )
)(createStore)(storage.reducer(reducer));

const dispatch = store.dispatch;

const load = storage.createLoader(engine);

load(store).
  then(
    () =>
    ReactDOM.render(
      <div>
        <Provider store={store}>
          <Recourse />
        </Provider>
      </div>,
      document.getElementById("app")
    )
  );

dispatch(joinChannel(channel)).
  then(_.compose(dispatch, getTerms)).
  then(_.compose(dispatch, refreshSchedule));
