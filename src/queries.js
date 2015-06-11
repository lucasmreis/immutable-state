import Mori from 'mori';

let { get, set, isSubset } = Mori;

export const canAddBar = foos =>
  isSubset(set(['requiredFoo']), foos);

window.canAddBar = canAddBar;