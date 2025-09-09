// Exercise 1 : Nested functions (arrow version)
let landscape = () => {
  let result = "";
  const flat = (x) => { for (let i = 0; i < x; i++) result += "_"; };
  const mountain = (x) => { result += "/"; for (let i = 0; i < x; i++) result += "'"; result += "\\"; };
  flat(4); mountain(4); flat(4);
  return result;
};
console.log(landscape()); // ___/''''\___

// Exercise 2 : Closure
const addTo = x => y => x + y;
const addToTen = addTo(10);
console.log(addToTen(3)); // 13

// Exercise 3 : Currying
const curriedSum = a => b => a + b;
console.log(curriedSum(30)(1)); // 31

// Exercise 4 : Currying (reusable)
const add5 = curriedSum(5);
console.log(add5(12)); // 17

// Exercise 5 : Composing
const compose = (f, g) => a => f(g(a));
const add1 = num => num + 1;
const add5Again = num => num + 5;
console.log(compose(add1, add5Again)(10)); // 16
