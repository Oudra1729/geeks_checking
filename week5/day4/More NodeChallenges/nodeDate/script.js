// script.js
const { timeUntilNewYear, minutesLived, nextHoliday } = require('./date');

// Exercise 1
console.log('--- Exercise 1 ---');
console.log(timeUntilNewYear());

// Exercise 2
console.log('\n--- Exercise 2 ---');
console.log(minutesLived('1998-09-21T00:00:00')); // Hardcoded birthdate

// Exercise 3
console.log('\n--- Exercise 3 ---');
console.log(nextHoliday());
