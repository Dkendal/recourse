import {createSelector, createStructuredSelector} from "reselect";
import time from "lib/time";

const timetable_start = state => state.settings.timetable.start;
const timetable_end = state => state.settings.timetable.end;
const text = state => state.settings.search.text;

const start = createSelector(
  timetable_start,
  (start) => {
    return time.formatTime(start);
  }
);

const end = createSelector(
  timetable_end,
  (end) => {
    return time.formatTime(end);
  }
);

const timetable = createStructuredSelector({
  start,
  end,
});

const search = createStructuredSelector({
  text,
});

export default createStructuredSelector({
  timetable,
  search,
});
