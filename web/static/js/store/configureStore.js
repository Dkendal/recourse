import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import * as storage from "redux-storage";
import createEngine from "redux-storage-engine-localstorage";
import filter from "redux-storage-decorator-filter";
import reducer, {loader} from '../reducers';
import deserializer from "./deserializer";

const engine = createEngine('recourse');

const filteredEngine = filter(
  engine,
  [
    ['frontEnd', 'selectedCourses'],
  ],
  []
);

const storageReducer = storage.reducer(reducer, deserializer);

const storageMiddleware = storage.createMiddleware(filteredEngine);

const load = storage.createLoader(filteredEngine);

const middleware = [
  thunk,
  storageMiddleware,
];

export default function configureStore(initialState) {
  const store = createStore(storageReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  load(store);

  return store;
}
