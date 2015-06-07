import Mori from 'mori';

import {prop} from './helpers';
import {addFoo, addBar} from './command';
import {currentState, update, listen} from './appState';
import {renderList} from './render';

let {get} = Mori;

// APPLICATION OUTPUTS
let foosElement = document.getElementById('foos-list');
let barsElement = document.getElementById('bars-list');

// INITIAL STATE
const initialState = currentState();
renderList(foosElement)(get(initialState, 'foos'));
renderList(barsElement)(get(initialState, 'bars'));

listen(prop('foos'), renderList(foosElement));
listen(prop('bars'), renderList(barsElement));

window.mori = Mori;
window.currentState = currentState;
window.update = update;
window.addFoo = addFoo;
window.addBar = addBar;