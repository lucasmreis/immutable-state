import Mori from 'mori';

import {conjItem} from './helpers';

export const addFoo = foo => state =>
  Mori.updateIn(state, ['foos'], conjItem(foo));

export const addBar = bar => state =>
  Mori.updateIn(state, ['bars'], conjItem(bar));