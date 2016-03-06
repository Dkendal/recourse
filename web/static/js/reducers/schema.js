import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import {JsonApiDataStore} from "jsonapi-datastore";

const reducer = handleActions(
  {
    SYNC: (state, {payload}) => {
      state.sync(payload);
      return state;
    }
  },
  new JsonApiDataStore()
);

export default reducer;
