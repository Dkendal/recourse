import {createSelector, createStructuredSelector} from "reselect";
import _ from "underscore";
import moment from "moment";
import {List} from "immutable";
import timetable from "./timetable";
import focusedSection from "./focusedSection";
import settings from "./settings";

const courseSearchText = state => state.frontEnd.courseFilter.courseName;
const endTimeStr = state => state.frontEnd.scheduleSettings.endTime;
const startTimeStr = state => state.frontEnd.scheduleSettings.startTime;

export const channel = state => state.channel;
export const terms = state => state.entries.terms;
export const selectedCourses = state => state.frontEnd.selectedCourses;
export const selectedTermIdx = state => state.frontEnd.selectedTerm;

function parseTime(t) {
  let date = moment(t, "HH:mm");
  // send 00:00:00 if the date is unparseable.
  return date = date.isValid() ? date : moment({h: 0, m: 0, s: 0});
}

const stringToDate = t => moment(t, "HH:mm:ss").toDate();

const scheduleStartTime = createSelector(
  (state => state.entries.scheduleStartTime),
  stringToDate,
);

const scheduleEndTime = createSelector(
  (state => state.entries.scheduleEndTime),
  stringToDate,
);

const frontendTimeSelector = (sel) => (
  createSelector(
    sel,
    // only want to display HH:mm
    (t) => parseTime(t).format("HH:mm")));

const backendTimeSelector = (sel) => (
  createSelector(
    sel,
    // elixir expects "HH:mm:ss" and will break with anything else.
    (t) => parseTime(t).toDate()));

const startTime = frontendTimeSelector(startTimeStr);

const endTime = frontendTimeSelector(endTimeStr);

// options to be displayed on the front end
export const scheduleSettings = createStructuredSelector({
  startTime,
  endTime
});

// params that will be sent to phoenix to build the schedule
export const scheduleParams = createStructuredSelector({
  startTime: backendTimeSelector(startTimeStr),
  endTime: backendTimeSelector(endTimeStr),
});

export const selectedTerm = createSelector(
  terms,
  selectedTermIdx,
  (terms, idx) => terms.get(idx)
);

export const courses = createSelector(
  selectedTerm,
  (term) => new List(term && term.courses || [])
);

export const worklist = createSelector(
  courses,
  selectedCourses,
  (courses, selectedCourses) => {
    return courses.filter(
      ({id}) => selectedCourses.has(id)
    );
  }
);

export const worklistIds = createSelector(
  worklist,
  courses => new List(courses.map(course => course.id))
);

/* Filter courses based on parameters set in the course filter.
 *
 * Return true if no value set on courseName.
 */
const filteredCourses = createSelector(
  courses,
  courseSearchText,
  (courses, query) => courses.filter(
    course => {
      if (query == false) {
        return true;
      }

      const regex = new RegExp(query, "i");

      const fields = [
        course.subject,
        course.number,
        course.title
      ];

      return _.some(fields, field => regex.test(field));
    }
  )
);

export const sections = createSelector(
  state => state.entries.sections,
  // flatten the structure of the sections into groupings of meeting time,
  // section, conflicts, and idx
  function (sections) {
    const acc = [];
    sections.forEach(
      (conflictGroup) =>
      conflictGroup.forEach(
        (section, idx) =>
        section.meeting_times.forEach(
          meetingTime => acc.push({
            meetingTime,
            section,
            conflicts: conflictGroup.length,
            idx })))
    );
    return acc;
  },
);

export default createStructuredSelector({
  channel,
  courseSearchText,
  courses,
  endTime,
  filteredCourses,
  focusedSection,
  settings,
  scheduleEndTime,
  scheduleStartTime,
  sections,
  selectedCourses,
  selectedTerm,
  selectedTermIdx,
  startTime,
  terms,
  timetable,
  worklist,
  worklistIds,
});
