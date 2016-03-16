import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import * as storage from "redux-storage";
import createEngine from "redux-storage-engine-localstorage";
import filter from "redux-storage-decorator-filter";
import debounce from "redux-storage-decorator-debounce";
import reducer, {loader} from '../reducers';
import deserializer from "./deserializer";

let engine = createEngine('recourse');

engine = filter(
  engine,
  [
    ['frontEnd', 'selectedCourses'],
  ],
  []
);

engine = debounce(engine, 1500);

const storageReducer = storage.reducer(reducer, deserializer);

const storageMiddleware = storage.createMiddleware(engine);

const load = storage.createLoader(engine);

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
