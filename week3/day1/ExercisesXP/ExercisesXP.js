// Exercise 1 : List of people
let people = ["Greg", "Mary", "Devon", "James"];

// Part I
// 1. Remove “Greg”
people.shift();

// 2. Replace “James” with “Jason”
people[people.indexOf("James")] = "Jason";

// 3. Add your name
people.push("Brahim");

// 4. Console.log Mary’s index
console.log("Index of Mary:", people.indexOf("Mary"));

// 5. Make a copy without Mary and your name
let copy = people.slice(1, people.length - 1);
console.log("Copy without Mary and Brahim:", copy);

// 6. Index of “Foo”
console.log("Index of Foo:", people.indexOf("Foo")); // -1 because not found

// 7. Last element
let last = people[people.length - 1];
console.log("Last element:", last);

// Part II
// 1. Loop through people
for (let person of people) {
    console.log(person);
}

// 2. Loop until Devon
for (let person of people) {
    console.log(person);
    if (person === "Devon") break;
}


// Exercise 2 : favorite colors
let colors = ["Blue", "Red", "Green", "Black", "White"];

for (let i = 0; i < colors.length; i++) {
    console.log(`My #${i + 1} choice is ${colors[i]}`);
}

// Bonus with suffixes
let suffixes = ["st", "nd", "rd", "th", "th"];
for (let i = 0; i < colors.length; i++) {
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}


// Exercise 3 : Repeat the question
let num = prompt("Enter a number:");
while (Number(num) < 10) {
    num = prompt("Enter a new number greater than or equal to 10:");
}


// Exercise 4 : Building Management
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent: {
        sarah: [3, 990],
        dan: [4, 1000],
        david: [1, 500],
    },
};

console.log("Number of floors:", building.numberOfFloors);
console.log("Apts on 1st & 3rd floor:", building.numberOfAptByFloor.firstFloor, building.numberOfAptByFloor.thirdFloor);
console.log("Second tenant:", building.nameOfTenants[1], "Rooms:", building.numberOfRoomsAndRent.dan[0]);

let sarahRent = building.numberOfRoomsAndRent.sarah[1];
let davidRent = building.numberOfRoomsAndRent.david[1];
let danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
}
console.log("Updated rents:", building.numberOfRoomsAndRent);


// Exercise 5 : Family
let family = {
    father: "John",
    mother: "Anna",
    child: "Sophie"
};

for (let key in family) {
    console.log("Key:", key);
}

for (let key in family) {
    console.log("Value:", family[key]);
}


// Exercise 6 : Rudolf
const details = {
    my: 'name',
    is: 'Rudolf',
    the: 'reindeer'
};

let sentence = "";
for (let key in details) {
    sentence += key + " " + details[key] + " ";
}
console.log(sentence.trim());


// Exercise 7 : Secret Group
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
let society = names.map(name => name[0]).sort().join("");
console.log("Secret Society:", society);
