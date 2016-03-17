import { createSelector, createStructuredSelector } from "reselect";

const ready = state => state.page.ready;

export default createStructuredSelector({
  ready,
});
