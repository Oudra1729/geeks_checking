// =============================
// Exercise 1 : Dog age to Human years
// =============================

const data = [
  { name: 'Butters', age: 3, type: 'dog' },
  { name: 'Cuty', age: 5, type: 'rabbit' },
  { name: 'Lizzy', age: 6, type: 'dog' },
  { name: 'Red', age: 1, type: 'cat' },
  { name: 'Joey', age: 3, type: 'dog' },
  { name: 'Rex', age: 10, type: 'dog' },
];

// --- Using a loop ---
let sumLoop = 0;
for (let animal of data) {
  if (animal.type === "dog") {
    sumLoop += animal.age * 7; // 1 dog year = 7 human years
  }
}
console.log("Sum of dog ages (loop):", sumLoop);

// --- Using reduce() ---
const sumReduce = data.reduce((acc, animal) => {
  if (animal.type === "dog") {
    return acc + (animal.age * 7);
  }
  return acc;
}, 0);
console.log("Sum of dog ages (reduce):", sumReduce);


// =============================
// Exercise 2 : Email cleanup
// =============================

const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';
const cleanedEmail = userEmail3.trim(); // remove whitespaces
console.log("Cleaned email:", cleanedEmail);


// =============================
// Exercise 3 : Employees #3
// =============================

const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor' },
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor' }
];

// --- Create an object where full name is the key and role is the value ---
const userRoles = {};
for (let user of users) {
  const fullName = `${user.firstName} ${user.lastName}`;
  userRoles[fullName] = user.role;
}
console.log("Users object:", userRoles);


// =============================
// Exercise 4 : Array to Object
// =============================

const letters = ['x', 'y', 'z', 'z'];

// --- Using for loop ---
const countLoop = {};
for (let letter of letters) {
  if (countLoop[letter]) {
    countLoop[letter]++; // if key exists, increment
  } else {
    countLoop[letter] = 1; // otherwise set to 1
  }
}
console.log("Letter count (loop):", countLoop);

// --- Using reduce() ---
const countReduce = letters.reduce((acc, letter) => {
  acc[letter] = (acc[letter] || 0) + 1; // if exists, increment; else 1
  return acc;
}, {});
console.log("Letter count (reduce):", countReduce);
