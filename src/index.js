import Mori from 'mori';

import {prop} from './helpers';
import {addFoo, addBar} from './command';
import {currentState, update, listen, undo} from './appState';
import {renderList} from './render';

let {get} = Mori;

// ----------------------------------------------------------------------
// APPLICATION OUTPUTS
let foosElement = document.getElementById('foos-list');
let barsElement = document.getElementById('bars-list');

// INITIAL STATE
const initialState = currentState();
renderList(foosElement)(get(initialState, 'foos'));
renderList(barsElement)(get(initialState, 'bars'));

// RENDER ON NEXT STATE
listen(prop('foos'), renderList(foosElement));
listen(prop('bars'), renderList(barsElement));

// ----------------------------------------------------------------------
// APPLICATION INPUTS
let undoElement = document.getElementById('undo');
undoElement.onclick = undo;

let newFooElement = document.getElementById('new-foo');
let addFooElement = document.getElementById('add-foo');
addFooElement.onclick = () => update(addFoo(newFooElement.value));

window.mori = Mori;
window.currentState = currentState;
window.update = update;
window.addFoo = addFoo;
window.addBar = addBar;
window.undo = undo;