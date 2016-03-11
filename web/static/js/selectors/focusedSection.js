import {createSelector, createStructuredSelector} from "reselect";

const data = (state) => state.data;
const id = (state) => state.focusedSection.id;
const visible = (state) => state.focusedSection.visible;

const hidden = createSelector(
  visible,
  (visible) => !visible
);

const section = createSelector(
  data,
  id,
  visible,
  (data, id, visible) => id && data.find("section", id)
);

export default createStructuredSelector({
  visible,
  hidden,
  section,
})
