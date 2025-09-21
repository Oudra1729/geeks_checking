const greet = require('./greeting');
const showColorfulMessage = require('./colorful-message');
const readFileContent = require('./read-file');

console.log("\n--- Greeting ---");
console.log(greet('Brahim'));

console.log("\n--- Colorful Message ---");
showColorfulMessage();

console.log("\n--- Reading File ---");
readFileContent();
