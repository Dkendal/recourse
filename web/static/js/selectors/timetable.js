import {createSelector, createStructuredSelector} from "reselect";
import _ from "underscore";
import {cast} from "../lib/meeting_time";
import d3 from "d3";

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

const days = createSelector(
  () => {
    return ["M", "T", "W", "R", "F"];
  }
)

const xOffset = createSelector(() => 10);

const meetingTimes = createSelector(
  timetable,
  loaded,
  (timetable, loaded) => {
    if (!loaded) { return []; }
    return timetable.meeting_times.map(cast);
  }
);

const start = createSelector(
  meetingTimes,
  (meetingTimes) => {
    if (_.isEmpty(meetingTimes)) {
      return new Date(0,0,0,8); // 8am
    }
    const earliestMt = _.min(meetingTimes, x => x.start_time);
    return earliestMt.start_time;
  }
);

const end = createSelector(
  meetingTimes,
  (meetingTimes) => {
    if (_.isEmpty(meetingTimes)) {
      return new Date(0,0,0,17); // 5pm
    }
    const latestMt = _.max(meetingTimes, x => x.end_time);
    return latestMt.end_time;
  }
);

// Scales
const timeScale = createSelector(
  start,
  end,
  xOffset,
  (start, end, xOffset) => {
    return d3.time.scale().
      domain([start, end]).
      range([xOffset, 100]).
      nice()
  }
);

const dayScale = createSelector(
  days,
  xOffset,
  (days, xOffset) => (
    d3.scale.ordinal().
      domain(days).
      rangeRoundBands([xOffset, 100], 0.05)
  )
)
// --

function setKey(mt) {
  return {
    ...mt,
    key: `${mt.id}-${mt.day}`,
  }
}

const setPosition = xScale => yScale => mt => {
  const y = yScale(mt.start_time);
  const y2 = yScale(mt.end_time);
  const height = y2 - y;

  const x1 = xScale(mt.day)
  const x2 = x1 + xScale.rangeBand();

  const overlapDomain = d3.range(mt.overlapSize);

  // subdivide this days domain into slices for each overlapping meeting time.
  const localScale = d3.scale.ordinal().
    domain(overlapDomain).
    rangeBands([x1, x2]);

  const x = localScale(mt.idx);
  const width = localScale.rangeBand();

  return {
    ...mt,
    y: `${y}%`,
    x: `${x}%`,
    width: `${width}%`,
    height: `${height}%`,
  };
};

// Set the index, and overlap size on a meeting time.
// This is done so that positions can be computed in the case where overlaps
// share the same space
const setGroups = (mt) => {
  const idx = _.findIndex(mt.overlap.meeting_times, (x => x.id === mt.id));

  return ({
    overlapSize: mt.overlap.meeting_times.length,
    idx,
    ...mt
  });
}

const setConflict = (mt) => ({
  inConflict: mt.overlap.meeting_times.length > 1,
  ...mt
});

const decorate = (xScale, yScale) => _.compose(
  setConflict,
  setPosition(xScale)(yScale),
  setGroups,
  setKey,
);

const decoratedMeetingTimes = createSelector(
  timeScale,
  dayScale,
  meetingTimes,
  (yScale, xScale, meetingTimes) => (
    _.chain(meetingTimes).
      map(decorate(xScale, yScale)).
      value()
  ),
);

const header = createSelector(
  dayScale,
  days,
  (scale, days) => {
    return days.map(day => ({
      x: `${ scale(day) + scale.rangeBand(day) /2 }%`,
      key: day,
      text: day,
    }))
  }
);

const ticks = createSelector(
  timeScale,
  (scale) => scale.ticks(d3.time.minutes, 30),
);

const tickFormat = createSelector(
  timeScale,
  (scale) => scale.tickFormat(),
);

const timeMarkers = createSelector(
  timeScale,
  ticks,
  tickFormat,
  xOffset,
  (scale, ticks, format, x1) => ticks.map(tick => ({
    text: format(tick),
    halfPast: tick.getMinutes() == 30,
    onTheHour: tick.getMinutes() == 0,
    noon: tick.getHours() == 12 && tick.getMinutes() == 0,
    y: `${ scale(tick) }%`,
    y1: `${ scale(tick) }%`,
    y2: `${ scale(tick) }%`,
    x1: `${ x1 }%`,
    x2: "100%",
  }))
)

export default createStructuredSelector({
  crns,
  days,
  end,
  header,
  loaded,
  meetingTimes: decoratedMeetingTimes,
  start,
  ticks,
  xOffset,
  timeMarkers,
});
