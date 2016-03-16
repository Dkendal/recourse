import { createAction } from "redux-actions";

const setSettingsTimetableStart = createAction("SET_SETTINGS_TIMETABLE_START");
const setSettingsTimetableEnd = createAction("SET_SETTINGS_TIMETABLE_END");
const setSettingsSearchText = createAction("SET_SETTINGS_SEARCH_TEXT");

export default {
  setSettingsTimetableStart,
  setSettingsTimetableEnd,
  setSettingsSearchText,
};
