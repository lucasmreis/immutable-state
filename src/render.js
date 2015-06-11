import Mori from 'mori';

import {canAddBar} from './queries';

const makeLi = (acc, item) => acc + '<li>' + item + '</li>';

export let renderList = elem => seq =>
  elem.innerHTML = Mori.reduce(makeLi, '<ul>', seq) + '</ul>';

export let renderFoosAndDisableBars = foosElem => barsButtons => seq => {
  barsButtons.forEach(b => b.disabled = !canAddBar(seq));
  renderList(foosElem)(seq);
};