//Exe 1 : Colors
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
colors.forEach((color, index) => {
  console.log(`${index + 1}# choice is ${color}.`);
});

if (colors.includes("Violet")) {
  console.log("Yeah");
} else {
  console.log("No...");
}

//Exe 2 : Colors #2
const ordinal = ["th", "st", "nd", "rd"];

// Fn to get the correct ordinal suffix
function getOrdinal(n) {
  if (n === 1) return ordinal[1]; // st
  if (n === 2) return ordinal[2]; // nd
  if (n === 3) return ordinal[3]; // rd
  return ordinal[0];              // th
}

colors.forEach((color, index) => {
  const pos = index + 1;
  console.log(`${pos}${getOrdinal(pos)} choice is ${color}.`);
});



//Exe 3 :

// 1
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];
const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);
// Output: ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange']

//2
const country = "USA";
console.log([...country]);
// Output: ['U', 'S', 'A']

//3
let newArray = [...[,,]];
console.log(newArray);
// Output: [undefined, undefined]



//Exe 4 : Employees
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

// 1. Map() to welcome students
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log(welcomeStudents);

// 2. Filter() to get Full Stack Residents
const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');
console.log(fullStackResidents);

// 3. Chain filter() and map() to get last names of Full Stack Residents
const lastNames = users
  .filter(user => user.role === 'Full Stack Resident')
  .map(user => user.lastName);
console.log(lastNames);

//Exe 5 : Star Wars
const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

// Use reduce to concatenate the words into a single string
const story = epic.reduce((acc, word) => acc + " " + word);
console.log(story);


//Exe 6 : Employees #2
const students = [
  {name: "Ray", course: "Computer Science", isPassed: true}, 
  {name: "Liam", course: "Computer Science", isPassed: false}, 
  {name: "Jenner", course: "Information Technology", isPassed: true}, 
  {name: "Marco", course: "Robotics", isPassed: true}, 
  {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
  {name: "Jamie", course: "Big Data", isPassed: false}
];

// 1. Filter students who passed
const passedStudents = students.filter(student => student.isPassed);
console.log(passedStudents);

// 2. Congratulate students who passed
students
  .filter(student => student.isPassed)
  .forEach(student => {
    console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
  } );
