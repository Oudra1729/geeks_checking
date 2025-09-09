// Currying version
const mergeWords = string => nextString =>
  nextString === undefined ? string : mergeWords(string + ' ' + nextString);

// examples
console.log(mergeWords('Hello')()); // "Hello"

console.log(mergeWords('There')('is')('no')('spoon.')()); // "There is no spoon."
