import {createSelector, createStructuredSelector} from "reselect";
import time from "lib/time";

const start = state => state.settings.timetable.start;
const end = state => state.settings.timetable.end;
const text = state => state.settings.search.text;

const params = createSelector(
  start,
  end,
  (start, end) => ({
    startTime: time.formatDateTime(start),
    endTime: time.formatDateTime(end),
  })
);

const timetable = createStructuredSelector({
  start,
  end,
  params,
});

const search = createStructuredSelector({
  text,
});

export default createStructuredSelector({
  timetable,
  search,
});
