// =============================
// Exercise 1: printFullName
// =============================

// Function with destructured object directly in the parameters
function printFullName({ first, last }) {
  return `Your full name is ${first} ${last}`;
}

// Test
console.log(printFullName({ first: 'Elie', last:'Schoppik' }));
// Output: Your full name is Elie Schoppik


// =============================
// Exercise 2: keysAndValues
// =============================

// Function that returns sorted keys and their corresponding values
function keysAndValues(obj) {
  // Get keys and sort them alphabetically
  const sortedKeys = Object.keys(obj).sort();

  // Map the sorted keys to get the values in the same order
  const values = sortedKeys.map(key => obj[key]);

  return [sortedKeys, values];
}

// Tests
console.log(keysAndValues({ a: 1, b: 2, c: 3 }));
// Output: [["a", "b", "c"], [1, 2, 3]]

console.log(keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));
// Output: [["a", "b", "c"], ["Apple", "Microsoft", "Google"]]

console.log(keysAndValues({ key1: true, key2: false, key3: undefined }));
// Output: [["key1", "key2", "key3"], [true, false, undefined]]


// =============================
// Exercise 3: Counter class
// =============================

class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment(); // count = 1
counterOne.increment(); // count = 2

const counterTwo = counterOne; // both variables reference the same object
counterTwo.increment(); // count = 3

console.log(counterOne.count);
// Output: 3
// Explanation: counterOne and counterTwo point to the same object in memory
