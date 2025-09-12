
// Cars Inventory Data

const inventory = [
  { id: 1, car_make: "Lincoln", car_model: "Navigator", car_year: 2009 },
  { id: 2, car_make: "Mazda", car_model: "Miata MX-5", car_year: 2001 },
  { id: 3, car_make: "Honda", car_model: "Accord", car_year: 1983 },
  { id: 4, car_make: "Land Rover", car_model: "Defender Ice Edition", car_year: 2010 },
  { id: 5, car_make: "Honda", car_model: "Accord", car_year: 1995 },
];


// Part I : getCarHonda

// Function that finds the first Honda in the inventory
function getCarHonda(carInventory) {
  // find() returns the first car object that matches the condition
  const hondaCar = carInventory.find(car => car.car_make === "Honda");

  // Build and return the string in the requested format
  return `This is a ${hondaCar.car_make} ${hondaCar.car_model} from ${hondaCar.car_year}.`;
}

// Test Part I
console.log(getCarHonda(inventory));
// Output: "This is a Honda Accord from 1983."


// Part II : sortCarInventoryByYear

// Function that sorts inventory by year (ascending)
function sortCarInventoryByYear(carInventory) {
  // Use slice() to create a copy so original inventory is not modified
  return carInventory.slice().sort((a, b) => a.car_year - b.car_year);
}

// Test Part II
console.log(sortCarInventoryByYear(inventory));
// Output should be:
// [
//   { id: 3, car_make: "Honda", car_model: "Accord", car_year: 1983 },
//   { id: 5, car_make: "Honda", car_model: "Accord", car_year: 1995 },
//   { id: 2, car_make: "Mazda", car_model: "Miata MX-5", car_year: 2001 },
//   { id: 1, car_make: "Lincoln", car_model: "Navigator", car_year: 2009 },
//   { id: 4, car_make: "Land Rover", car_model: "Defender Ice Edition", car_year: 2010 }
// ]
