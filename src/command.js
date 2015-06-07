import Mori from 'mori';

let {conj, updateIn} = Mori;

const conjItem = item => coll => conj(coll, item);

export const addFoo = foo => state =>
  updateIn(state, ['foos'], conjItem(foo));