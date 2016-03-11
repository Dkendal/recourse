import {createSelector} from "reselect";

const data = (state) => state.data;
const id = (state) => state.focusedSection.id;

const focusedSection = createSelector(
  data,
  id,
  (data, id) => id && data.find("section", id)
);

export default focusedSection;
