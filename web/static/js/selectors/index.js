import { createSelector, createStructuredSelector } from "reselect";
import _ from "lodash";
import moment from "moment";
import { List } from "immutable";
import timetable from "./timetable";
import focusedSection from "./focusedSection";
import settings from "./settings";
import page from "./page";

const courseSearchText = state => state.frontEnd.courseFilter.courseName;
const endTimeStr = state => state.frontEnd.scheduleSettings.endTime;
const startTimeStr = state => state.frontEnd.scheduleSettings.startTime;

export const channel = state => state.channel;
export const terms = state => state.entries.terms;
export const selectedCourses = state => state.settings.courses.selected;
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
  (state => state.settings.search),
  (courses, search) => courses.filter(
    course => {
      let result = courses;

      if (search.text) {
        const regex = new RegExp(search.text, "i");

        const text = [
          course.subject,
          course.number,
          course.title,
        ].join(" ");

        result = regex.test(text);
      }

      return result;
    }
  ).slice(0, 100)
);

export default createStructuredSelector({
  channel,
  courses,
  endTime,
  filteredCourses,
  focusedSection,
  page,
  scheduleEndTime,
  scheduleStartTime,
  selectedCourses,
  selectedTerm,
  selectedTermIdx,
  settings,
  startTime,
  terms,
  timetable,
  worklist,
  worklistIds,
});
