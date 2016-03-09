import {createSelector, createStructuredSelector} from "reselect";

// data store
const store = (state) => state.data;
const id = (state) => state.frontEnd.timetable.id;
const loaded = (state) => state.frontEnd.timetable.loaded;

const timetable = createSelector(
  store,
  id,
  (store, id) => {
    return store.find("timetable", id);
  }
);

const crns = createSelector(
  timetable,
  loaded,
  (timetable, loaded) => {
    return loaded ?
      timetable.sections.map(section => section.crn) :
      []
  }
);

const meetingTimes = createSelector(
  timetable,
  loaded,
  (timetable, loaded) => {
    if (!loaded) { return []; }
    let meetingTimes = _.flatten(_.pluck(timetable.sections, "meeting_times"));

    meetingTimes = meetingTimes.map(cast);

    return meetingTimes;
  }
)

const days = createSelector(
  () => {
    return ["M", "T", "W", "R", "F"];
  }
)

const start = createSelector(
  meetingTimes,
  (meetingTimes) => {
    if (_.isEmpty(meetingTimes)) {
      return new Date(0,0,0,8); // 8am
    }
    const earliestMt = _.min(meetingTimes, x => x.start_time);
    return earliestMt.end_time;
  }
)

const end = createSelector(
  meetingTimes,
  (meetingTimes) => {
    if (_.isEmpty(meetingTimes)) {
      return new Date(0,0,0,17); // 5pm
    }
    const latestMt = _.max(meetingTimes, x => x.end_time);
    return latestMt.end_time;
  }
)

export default createStructuredSelector({
  crns,
  loaded,
  meetingTimes,
  days,
  start,
  end,
  // ticks,
});
