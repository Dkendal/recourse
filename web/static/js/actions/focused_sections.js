import {createAction} from "redux-actions";

const setFocusedSection = createAction("SET_FOCUSED_SECTION");

const hideFocusedSection = createAction("HIDE_FOCUSED_SECTION");

export default {
  setFocusedSection,
  hideFocusedSection,
};
