import Mori from 'mori';

let { equals, hashMap, set, vector, conj, peek, each, get, toJs, reverse, rest, comp, count } = Mori;

let initialValue = hashMap('foos', set([1, 2, 3]), 'bars', set(['a', 'b', 'c']));

let history = vector(initialValue);

let listeners = vector();

// get current state
export const currentState = () => peek(history);

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
  const previousState = peek(history);

  // calculate new state
  const newState = fn(peek(history));

  if (!equals(previousState, newState)) {
    // add new state to history
    history = conj(history, newState);

    // fire listener callbacks
    each(listeners, callListener(previousState, newState));
  }
};

export const undo = () => {
  if (count(history) > 1) {
    const previousState = peek(history);
    history = comp(reverse, rest, reverse)(history);
    const newState = peek(history);
    each(listeners, callListener(previousState, newState));
  }
}