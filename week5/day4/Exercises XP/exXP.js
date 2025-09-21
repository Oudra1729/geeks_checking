// -----------------------------
// Exercise 1: Multiple Exports & CommonJS
// -----------------------------
const products = [
  { name: "Laptop", price: 1200, category: "Electronics" },
  { name: "Shirt", price: 25, category: "Clothing" },
  { name: "Coffee", price: 10, category: "Food" }
];

function findProduct(productName) {
  const product = products.find(p => p.name === productName);
  if (product) console.log("Found product:", product);
  else console.log(`Product ${productName} not found.`);
}

console.log("\n--- Exercise 1 ---");
findProduct("Laptop");
findProduct("Coffee");
findProduct("Phone");

// -----------------------------
// Exercise 2: ES6 Module example (simulated here in same file)
// -----------------------------
const people = [
  { name: "Alice", age: 25, location: "Paris" },
  { name: "Bob", age: 30, location: "London" },
  { name: "Charlie", age: 35, location: "New York" }
];

function calculateAverageAge(arr) {
  const totalAge = arr.reduce((sum, person) => sum + person.age, 0);
  const average = totalAge / arr.length;
  console.log("Average age:", average);
}

console.log("\n--- Exercise 2 ---");
calculateAverageAge(people);

// -----------------------------
// Exercise 3: File Management (CommonJS) 
// -----------------------------
const fs = require('fs');

function readFile(filename) {
  return fs.readFileSync(filename, 'utf-8');
}

function writeFile(filename, content) {
  fs.writeFileSync(filename, content);
}

// Prepare files
fs.writeFileSync('Hello World.txt', 'Hello World !!');
fs.writeFileSync('Bye World.txt', 'Bye World !!');

console.log("\n--- Exercise 3 ---");
const helloContent = readFile('Hello World.txt');
console.log("Read from Hello World.txt:", helloContent);

writeFile('Bye World.txt', 'Writing to the file');
console.log("Wrote to Bye World.txt");

// -----------------------------
// Exercise 4: Todo List (ES6 class in same file)
// -----------------------------
class TodoList {
  constructor() { this.tasks = []; }
  addTask(task) { this.tasks.push({ task, completed: false }); }
  completeTask(index) { if (this.tasks[index]) this.tasks[index].completed = true; }
  listTasks() { console.log(this.tasks); }
}

console.log("\n--- Exercise 4 ---");
const myTodo = new TodoList();
myTodo.addTask("Learn Node.js");
myTodo.addTask("Build a project");
myTodo.completeTask(0);
myTodo.listTasks();

// -----------------------------
// Exercise 5: Custom math module + lodash
// -----------------------------
const _ = require('lodash');

const math = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};

console.log("\n--- Exercise 5 ---");
console.log("Add:", math.add(5, 3));
console.log("Multiply:", math.multiply(5, 3));

const numbers = [1, 2, 3, 4];
console.log("Shuffled array using lodash:", _.shuffle(numbers));

// -----------------------------
// Exercise 6: Chalk
// -----------------------------
const chalk = require('chalk');

console.log("\n--- Exercise 6 ---");
console.log(chalk.blue('Hello World!'));
console.log(chalk.red.bgYellow.bold('Important Message!'));

// -----------------------------
// Exercise 7: Reading & Copying files
// -----------------------------
fs.writeFileSync('source.txt', 'This is the source file content.');

const content = fs.readFileSync('source.txt', 'utf-8');
fs.writeFileSync('destination.txt', content);

console.log("\n--- Exercise 7 ---");
console.log("Copied content from source.txt to destination.txt");

const files = fs.readdirSync('./');
console.log("Files in current directory:");
files.forEach(file => console.log(file));
