import Mori from 'mori';

let { equals, hashMap, set, vector, conj, peek, each, get, toJs, subvec, comp, count, into } = Mori;

let initialValue = hashMap('foos', set([1, 2, 3]), 'bars', set(['a', 'b', 'c']));

let state = initialValue;

let listeners = vector();

// get current state
export const currentState = () => state;

// listen to state updates
export const listen = (listenTo, callback) => {
  listeners = conj(listeners, hashMap(
    'listenTo', listenTo,
    'callback', callback
  ));
};

const callListener = (previousState, newState) => listener => {
  const listenTo      = get(listener, 'listenTo');

  const previousListenTo = listenTo(previousState);
  const newListenTo      = listenTo(newState);

  if (!equals(previousListenTo, newListenTo)) {
    get(listener, 'callback')(newListenTo);
  }
};

// updates state
export const update = fn => {
  const previousState = state;

  // calculate new state
  const newState = fn(previousState);

  if (!equals(previousState, newState)) {
    state = newState;

    // fire listener callbacks
    each(listeners, callListener(previousState, newState));
  }
};