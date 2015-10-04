import {createStore} from "redux";
import React from "react";
import {Provider} from "react-redux";
import Recourse from "./containers/Recourse";
import recourse from "./reducers";
import {setCourses} from "./actions";

import socket from "./socket";

// Now that you are connected, you can join channels with a topic:
const channel = socket.channel("schedules:planner", {});

const store = createStore(recourse);

channel.join().
  receive("ok", resp => {
    store.dispatch(setCourses(resp));
  }).

  receive("error", resp => {
    console.log("Unable to join", resp);
  });

//debugging
store.subscribe(() => {
  console.log(store.getState());
});

React.render(
  <Provider store={store}>
    {() => <Recourse />}
  </Provider>,
  document.getElementById("app")
);
