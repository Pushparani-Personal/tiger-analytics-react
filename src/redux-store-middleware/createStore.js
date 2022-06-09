import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { makeRootReducer } from './makeRootReducer';
import { registerReducer } from './registerReducer';
import { ReducerStore } from './ReducerStore';

/**
 * @param {Object} INITIAL_STATE
 * @param {Object} options
 * @param {Function[]} options.middleware
 * @param {Function[]} options.enhancers
 * @return {Promise<import('redux').Store>}
 */
export function createStore(INITIAL_STATE = {}, {
  middleware = [],
  enhancers = [],
  baseReducers = {},
  rootSaga = []
} = {}) {
  const sagaMiddleware = createSagaMiddleware();

  // Order matters here; ensure sagaMiddleware can intercept actions before other middleware
  middleware = [
    sagaMiddleware,
    ...middleware,
  ];

  const reducerStore = new ReducerStore();
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createReduxStore(
    makeRootReducer(reducerStore, baseReducers, INITIAL_STATE),
    INITIAL_STATE,
    composeEnhancer(applyMiddleware(...middleware), ...enhancers),
  );

  store.reducerStore = reducerStore;
  store.registerReducer = (key, reducer) => registerReducer(store, { key, reducer, baseReducers });

  sagaMiddleware.run(rootSaga);
  return store;
}
