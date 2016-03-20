import {createSelector, createStructuredSelector} from "reselect";
import time from "lib/time";

const start = state => state.settings.timetable.start;
const end = state => state.settings.timetable.end;
const text = state => state.settings.search.text;

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
