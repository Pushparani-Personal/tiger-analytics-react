import { makeRootReducer } from './makeRootReducer';

export function registerReducer(store, { key, reducer, baseReducers }) {
  store.reducerStore.add(key, reducer);
  store.replaceReducer(makeRootReducer(store.reducerStore, baseReducers));
}
