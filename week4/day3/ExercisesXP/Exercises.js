// 
// Exercise 1 : Location
// 

const person = {
  name: 'John Doe',
  age: 25,
  location: {
    country: 'Canada',
    city: 'Vancouver',
    coordinates: [49.2827, -123.1207]
  }
};

// Object destructuring
const { name, location: { country, city, coordinates: [lat, lng] } } = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);
// Output: I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)


// 
// Exercise 2 : Display Student Info
// 

function displayStudentInfo({ first, last }) {
  // Destructure the object parameter
  return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({ first: 'Elie', last:'Schoppik' }));
// Output: Your full name is Elie Schoppik


// 
// Exercise 3 : User & ID
// 

const users = { user1: 18273, user2: 92833, user3: 90315 };

// Part 1: Object to array
const usersArray = Object.entries(users);
console.log(usersArray);
// Output: [ ['user1', 18273], ['user2', 92833], ['user3', 90315] ]

// Part 2: Multiply IDs by 2
const usersArrayDoubled = usersArray.map(([user, id]) => [user, id * 2]);
console.log(usersArrayDoubled);
// Output: [ ['user1', 36546], ['user2', 185666], ['user3', 180630] ]


// 
// Exercise 4 : Person class
// 

class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member); 
// Output: object (every instance of a class is of type 'object')


// 
// Exercise 5 : Dog class extension
// 

class Dog {
  constructor(name) {
    this.name = name;
  }
}

// Correct way to extend Dog
class Labrador extends Dog {
  constructor(name, size) {
    super(name); // call parent constructor
    this.size = size;
  }
}

// Options analysis:
// 1 -> Wrong: must call super() before using 'this'
// 2 -> Correct
// 3 -> Wrong: 'name' undefined in super()
// 4 -> Wrong: must call super() in derived class before using 'this'


// 
// Exercise 6 : Challenges
// 

// Compare arrays and objects
// console.log([2] === [2]); // false, different references
// console.log({} === {});  // false, different references

// Object references
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5 };

object1.number = 4;
console.log(object2.number); // 4 (object2 points to same object as object1)
console.log(object3.number); // 4 (object3 points to same object as object1)
console.log(object4.number); // 5 (object4 is a separate object)


// 
// Classes: Animal & Mammal
// 

class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  sound(animalSound) {
    return `${animalSound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

// Create an instance
const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmerCow.sound('Moooo'));
// Output: Moooo I'm a cow, named Lily and I'm brown and white
