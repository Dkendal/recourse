import {createSelector, createStructuredSelector} from "reselect";
import moment from "moment";
import _ from "underscore";
import { notLoaded } from "constants";
import { cast } from "lib/meeting_time";
import { toColor } from "lib/course";

// returning a non-null respond lets us match with destructing and return
// a default param

const dateFormat = "MMMM Do, YYYY";
const timeFormat = "h:mm a";

function formatDates(mt) {
  const date_start = moment(mt.date_start).format(dateFormat);
  const date_end   = moment(mt.date_end).format(dateFormat);
  const end_time   = moment(mt.end_time).format(timeFormat);
  const start_time = moment(mt.start_time).format(timeFormat);

  return {
    ...mt,
    start_time,
    end_time,
    date_start,
    date_end,
  };
}

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
    return meeting_times.map(_.compose(formatDates, cast));
  }
);

const course = createSelector(
  section,
  ({ course = notLoaded }) => course
);

const color = createSelector(
  course,
  (course) => toColor(course)
);

export default createStructuredSelector({
  ready,
  visible,
  hidden,
  section,
  course,
  meetingTimes,
  color,
})
