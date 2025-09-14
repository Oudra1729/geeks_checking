const allTruthyArrow = (...args) => args.every(Boolean);
//exmples
console.log(allTruthyArrow(1, 'hello', true)); // true
console.log(allTruthyArrow(1, '', true)); // false
console.log(allTruthyArrow(1, null, true)); // false
console.log(allTruthyArrow(1, undefined, true)); // false
console.log(allTruthyArrow(1, 0, true)); // false
