
function hello (name : string) {
  console.log(`Hello ${name}`);
}

hello('test');


// given a state change like
// state 0
// { x: 100, y: 100 }
//
// state 1
// { x: 110, y: 100 }
//
// we want to determine which instructions are necessary to transition
// from state 0 to state 1
//
// First we should generate a difference
//
// state 1 - state 0
// { x: 10 }
//
// that is to say, the only difference between state 0 and 1 is that
// the property x has increased by 10
//
// given an array of possible instructions we can use, like:
// [
//   function moveRight (distance, state) {
//     state.x += distance;
//   },
//
//   function moveLeft (distance, state) {
//     state.x -= distance;
//   }
// ]
//
// which function should we call, and with what arguments?
//
// from a naive perspective, we could attempt to call each function.
// That requires we conjure up some arguments, which is not really ideal. How will we know which argument to use?
//
// What if we were to rewrite these functions?
//
// [
//   const moveRight = update('x', plus(state('x'), args('distance')))
// ]
