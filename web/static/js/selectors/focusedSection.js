import { notLoaded } from "constants";
import {createSelector, createStructuredSelector} from "reselect";

// returning a non-null respond lets us match with destructing and return
// a default param

const data = (state) => state.data;
const id = (state) => state.focusedSection.id;
const ready = (state) => !!state.focusedSection.id;
const visible = (state) => state.focusedSection.visible;

const hidden = createSelector(
  visible,
  (visible) => !visible
);

const section = createSelector(
  data,
  id,
  (data, id) => data.find("section", id) || notLoaded
);

const meetingTimes = createSelector(
  section,
  ({ meeting_times = [] }) => {
    return meeting_times;
  }
)

const course = createSelector(
  section,
  ({ course = notLoaded }) => course
)


export default createStructuredSelector({
  ready,
  visible,
  hidden,
  section,
  course,
  meetingTimes,
})
