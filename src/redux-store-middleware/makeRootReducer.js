import { combineReducers } from 'redux';
import difference from 'lodash/difference';

export function makeRootReducer(reducerStore, baseReducers = {}, INITIAL_STATE = {}) {
  // Next few lines are related to hydration, client-side, of reducers/state.
  // If there are differences in the baseReducers and the reducers on rehydration,
  // we need to add no-op pseudo reducers and later replace them with their actual
  // reducers. This is to prevent the redux warning that occurs if we rehydrate
  // state and the reducers that were used to create state are not there initially.
  const stateKeys = Object.keys(INITIAL_STATE);

  let pseudoReducerKeys = [];

  if (stateKeys.length) {
    pseudoReducerKeys = difference(stateKeys, Object.keys(baseReducers));
  }

  pseudoReducerKeys.forEach(key => reducerStore.add(key, (state = {}) => state));

  const reducers = {
    ...baseReducers,
    ...reducerStore.get(),
  };

  // If there are no reducers to pass to combineReducers,
  // just return a no-op reducer function to prevent warning when passing
  // an empty object literal to combineReducers.
  if (!Object.keys(reducers).length) {
    return () => {};
  }

  return combineReducers(reducers);
}
