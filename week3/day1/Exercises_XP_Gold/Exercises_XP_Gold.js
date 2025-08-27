// Exercise 1 : Divisible by three
let numbers = [123, 8409, 100053, 333333333, 7];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 3 === 0) {
    console.log(numbers[i], true);
  } else {
    console.log(numbers[i], false);
  }
}


// Exercise 2 : Attendance
let guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina"
};

// Prompt in browser; here we simulate with a variable
let studentName = prompt("Enter your name:").toLowerCase();

if (studentName in guestList) {
  console.log(`Hi! I'm ${studentName}, and I'm from ${guestList[studentName]}.`);
} else {
  console.log("Hi! I'm a guest.");
}


// Exercise 3 : Playing with numbers
let age = [20, 5, 12, 43, 98, 55];

// 1. Sum of all numbers
let sum = 0;
for (let i = 0; i < age.length; i++) {
  sum += age[i];
}
console.log("Sum of ages:", sum);

// 2. Highest age
let maxAge = age[0];
for (let i = 1; i < age.length; i++) {
  if (age[i] > maxAge) {
    maxAge = age[i];
  }
}
console.log("Highest age:", maxAge);
