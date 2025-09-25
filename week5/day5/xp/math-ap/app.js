
const _ = require("lodash");
const { add, multiply } = require("./math");

console.log("Add:", add(5, 3));
console.log("Multiply:", multiply(4, 2));

const numbers = [1, 2, 3, 4, 5];
console.log("Sum with lodash:", _.sum(numbers));
