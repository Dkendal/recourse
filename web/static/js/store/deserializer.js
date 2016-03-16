import {Set} from "immutable";

function deserializer(state, store) {
  // store.frontEnd.selectedCourses =
  //   Set(store.frontEnd.selectedCourses);

  return store;
}

export default deserializer;
