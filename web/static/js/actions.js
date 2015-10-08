export const ADD_COURSE = "ADD_COURSE";
export const REMOVE_COURSE = "REMOVE_COURSE";
export const SET_COURSES = "SET_COURSES";
export const CHANNEL_CONNECTING = "CHANNEL_CONNECTING";

export function setCourses(courses) {
  return {type: SET_COURSES, courses};
}

export function addCourse(id) {
  return {type: ADD_COURSE, id};
}

export function removeCourse(id) {
  return {type: REMOVE_COURSE, id};
}

export function joinChannel(channel) {
  return function(dispatch) {
    // dispatch(connectToChannel(channel));

    channel.join().
      receive("ok", resp => {
        dispatch(setCourses(resp));
      }).
      receive("error", resp => {
        console.log("Unable to join", resp);
      });
  };
}
