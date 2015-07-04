//
// testing variable size of mutable and immutable data structures.
//

var m = require('mori');
var s = require('sizeof');

var max = 1000000;

var series = m.range(0, max);

var mutable1 = m.toJs(series);
var mutable2 = m.toJs(series);
mutable2.push(max + 1);

var mutables = {m1: mutable1, m2: mutable2}
console.log('Size of mutables:', s.sizeof(mutables, true));

var immutable1 = m.toClj(mutable1);
var immutable2 = m.conj(immutable1, max + 1);

var immutables = {m1: immutable1, m2: immutable2}
console.log('Size of immutables:', s.sizeof(immutables, true));