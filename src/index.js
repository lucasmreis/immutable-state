import Mori from 'mori';
import sizeof from 'object-sizeof';

import {prop} from './helpers';
import {addFoo, addBar} from './command';
import {canAddBar} from './queries';
import {currentState, update, listen, undo} from './appState';
import {renderList, renderFoosAndDisableBars} from './render';

let {get} = Mori;

// ----------------------------------------------------------------------
// APPLICATION INPUTS
let undoElement = document.getElementById('undo');
undoElement.onclick = undo;

let newFooElement = document.getElementById('new-foo');
let addFooElement = document.getElementById('add-foo');
addFooElement.onclick = () => update(addFoo(newFooElement.value));

let newBarElement = document.getElementById('new-bar');
let addBarElement = document.getElementById('add-bar');
addBarElement.onclick = () => update(addBar(newBarElement.value));

let newSecondBarElement = document.getElementById('new-second-bar');
let addSecondBarElement = document.getElementById('add-second-bar');
addSecondBarElement.onclick = () => update(addBar(newSecondBarElement.value));

// ----------------------------------------------------------------------
// APPLICATION OUTPUTS
let foosElement = document.getElementById('foos-list');
let barsElement = document.getElementById('bars-list');

// INITIAL STATE
const initialState = currentState();
renderList(foosElement)(get(initialState, 'foos'));
renderList(barsElement)(get(initialState, 'bars'));

// RENDER ON NEXT STATE
listen(prop('bars'), renderList(barsElement));
listen(prop('foos'), renderFoosAndDisableBars(foosElement)([
  addBarElement,
  addSecondBarElement
]));

window.mori = Mori;
window.currentState = currentState;
window.update = update;
window.addFoo = addFoo;
window.addBar = addBar;
window.undo = undo;