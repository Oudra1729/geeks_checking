// --------------------------------------------------
// Exercise 1 : Analyzing the map method
// --------------------------------------------------

const mapResult = [1, 2, 3].map(num => {
  if (typeof num === 'number') return num * 2;
  return;   
});

console.log("Exercise 1 Output:", mapResult);
// Output: [2, 4, 6]
// Because all elements are numbers, each is multiplied by 2.

// --------------------------------------------------
// Exercise 2 : Analyzing the reduce method
// --------------------------------------------------

const reduceResult = [[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    // Concatenate the current array into the accumulator
    return acc.concat(cur);
  },
  [1, 2], // Initial value of accumulator
);

console.log("Exercise 2 Output:", reduceResult);
// Output: [1, 2, 0, 1, 2, 3]
// Explanation:
// Start with [1, 2]
// Add [0, 1] -> [1, 2, 0, 1]
// Add [2, 3] -> [1, 2, 0, 1, 2, 3]

// --------------------------------------------------
// Exercise 3 : Analyze this code
// --------------------------------------------------

const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
  console.log("Value:", num, "Index:", i);
  // alert(num); // In a browser, this would display a popup
  return num * 2;
});

// Output of i: i is the index of the element
// For array [1, 2, 4, 5, 8, 9], i goes from 0 to 5.

// --------------------------------------------------
// Exercise 4 : Nested arrays
// --------------------------------------------------

// Part A: Flatten nested array into [1,2,3,[4],[5]]
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
const flatArray = array.flat(2); // Flatten 2 levels
console.log("Exercise 4A Output:", flatArray);
// Output: [1, 2, 3, [4], [5]]

// Bonus one-liner:
console.log("Exercise 4A Bonus:", [[1],[2],[3],[[[4]]],[[[5]]]].flat(2));

// Part B: Modify greeting array into sentences
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const sentenceArray = greeting.map(words => words.join(" "));
console.log("Exercise 4B Output:", sentenceArray);
// Output: ["Hello young grasshopper!", "you are", "learning fast!"]

// Part C: Turn greeting array into a single string
const greetingString = greeting.flat().join(" ");
console.log("Exercise 4C Output:", greetingString);
// Output: "Hello young grasshopper! you are learning fast!"

// Part D: Free the trapped number
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const freed = trapped.flat(Infinity); // Flatten all levels
console.log("Exercise 4D Output:", freed);
// Output: [3]
