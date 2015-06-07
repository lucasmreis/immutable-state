import Mori from 'mori';

const makeLi = (acc, item) => acc + '<li>' + item + '</li>';

export let renderList = elem => seq =>
  elem.innerHTML = Mori.reduce(makeLi, '<ul>', seq) + '</ul>';
