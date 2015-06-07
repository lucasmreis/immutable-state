import Mori from 'mori';

import {addFoo} from './command';
import {currentState, update, listen} from './appState';

let {toJs} = Mori;

console.log('INITIAL STATE', toJs(currentState()));

listen(s => s, s => console.log('NEW STATE', toJs(s)));

update(x => x);
update(addFoo('newFoo'));
update(x => x);
update(x => x);
update(addFoo('newFoo2'));
update(addFoo('newFoo2'));
update(x => x);
update(addFoo('newFoo'));