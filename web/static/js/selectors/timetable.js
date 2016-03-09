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

const meetingTimes = createSelector(
  timetable,
  loaded,
  (timetable, loaded) => {
    if (!loaded) { return []; }
    let meetingTimes = _.flatten(_.pluck(timetable.sections, "meeting_times"));

    meetingTimes = meetingTimes.map(cast);

    return meetingTimes;
  }
);

const start = createSelector(
  meetingTimes,
  (meetingTimes) => {
    if (_.isEmpty(meetingTimes)) {
      return new Date(0,0,0,8); // 8am
    }
    const earliestMt = _.min(meetingTimes, x => x.start_time);
    return earliestMt.end_time;
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

const timeScale = createSelector(
  start,
  end,
  (start, end) => {
    return d3.time.scale().
      domain([start, end]).
      range([0, 100]).
      nice(30);
  }
);

const dayScale = createSelector(
  days,
  (days) => (
    d3.scale.ordinal().
      domain(days).
      rangeRoundBands([10, 100], 0.05)
  )
)

const decoratedMeetingTimes = createSelector(
  timeScale,
  dayScale,
  meetingTimes,
  (yScale, dayScale, meetingTimes) => {
    let mts = meetingTimes.map(mt => {
      const y = yScale(mt.start_time);
      const y2 = yScale(mt.end_time);
      const height = y2 - y;

      return mt.days.map(day => {
        const key = `${mt.id}-${day}`;
        const x = dayScale(day)
        const width = dayScale.rangeBand(day);

        return {
          key,
          y: `${y}%`,
          x: `${x}%`,
          width: `${width}%`,
          height: `${height}%`,
          day,
          ...mt,
        };
      })
    });

    return _.flatten(mts);
  },
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
  (scale, ticks, format) => ticks.map(tick => ({
    text: format(tick),
    position: scale(tick),
  }))
)

export default createStructuredSelector({
  crns,
  loaded,
  meetingTimes,
  decoratedMeetingTimes,
  days,
  start,
  end,
  ticks,
  timeMarkers,
});
