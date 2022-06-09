export class ReducerStore {
  constructor() {
    this.reducers = {};
  }

  add(key, reducer) {
    this.reducers[key] = reducer;
  }

  get() {
    return this.reducers;
  }
}
