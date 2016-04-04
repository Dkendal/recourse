import { createAction } from "redux-actions";

const setSettingsTermsId = createAction("SET_SETTINGS_TERMS_ID");
const setSettingsTimetableStart = createAction("SET_SETTINGS_TIMETABLE_START");
const setSettingsTimetableEnd = createAction("SET_SETTINGS_TIMETABLE_END");
const setSettingsSearchText = createAction("SET_SETTINGS_SEARCH_TEXT");
const toggleSettingsCoursesSelected = createAction("TOGGLE_SETTINGS_COURSES_SELECTED");

export default {
  setSettingsTermsId,
  setSettingsTimetableStart,
  setSettingsTimetableEnd,
  setSettingsSearchText,
  toggleSettingsCoursesSelected,
};
