import { createAction } from "redux-actions";
import channelActions from "./channel";
import settingsActions from "./settings";
import focusedSectionActions from "./focused_sections";
import pageActions from "./page";

export default {
  ...channelActions,
  ...focusedSectionActions,
  ...settingsActions,
  ...pageActions,
};
