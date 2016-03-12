import {createSelector, createStructuredSelector} from "reselect";
import moment from "moment";
import _ from "underscore";
import { notLoaded, placeholders } from "lib/constants";
import { cast } from "lib/meeting_time";
import { toColor } from "lib/course";
import timetable from "./timetable";

const dateFormat = "MMMM Do, YYYY";
const timeFormat = "h:mm a";

const format = (t, f) => moment(t).format(f);
const formatDate = (t) => format(t, dateFormat);
const formatTime = (t) => format(t, timeFormat);

function formatDates(mt) {
  const date_start = formatDate(mt.date_start);
  const date_end   = formatDate(mt.date_end);
  const end_time   = formatTime(mt.end_time);
  const start_time = formatTime(mt.start_time);

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
  (data, id) => data.find("section", id) || placeholders.section
);

const meetingTimes = createSelector(
  section,
  ({ meeting_times = [] }) => {
    return meeting_times.map(_.compose(formatDates, cast));
  }
);

const course = createSelector(
  section,
  ({ course = placeholders.course }) => course
);

const color = createSelector(
  course,
  (course) => toColor(course)
);

const relatedSections = createSelector(
  section,
  course,
  timetable,
  (section, course, { sections }) => {
    return sections.filter(s => s.course.id == course.id && s.id != section.id)
  }
)

export default createStructuredSelector({
  ready,
  visible,
  hidden,
  section,
  course,
  meetingTimes,
  relatedSections,
  color,
})
