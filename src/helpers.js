import Mori from 'mori';

export const prop = key => o => Mori.get(o, key);

export const conjItem = item => coll => Mori.conj(coll, item);