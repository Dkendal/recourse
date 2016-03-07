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
  (timetable, loaded) => (
    loaded ?
      timetable.sections.map(section => section.crn) :
      []
  )
);

const meetingTimes = createSelector(
  timetable,
  loaded,
  (timetable, loaded) => (
    loaded ?
      timetable.sections.map(section => section.meetingTimes) :
      []
  )
)

export default createStructuredSelector({
  crns,
  meetingTimes,
  // ticks,
  // days,
});
