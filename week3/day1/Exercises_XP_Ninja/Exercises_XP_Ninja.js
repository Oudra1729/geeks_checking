// Exercise 1 : Checking the BMI

// Two objects with details and a method to calculate BMI
const person1 = {
  fullName: "Alice Johnson",
  mass: 68, // kg
  height: 1.65, // meters
  calcBMI: function () {
    return this.mass / (this.height * this.height);
  }
};

const person2 = {
  fullName: "Bob Smith",
  mass: 85, // kg
  height: 1.80, // meters
  calcBMI: function () {
    return this.mass / (this.height * this.height);
  }
};

// Function to compare BMI
function compareBMI(p1, p2) {
  const bmi1 = p1.calcBMI();
  const bmi2 = p2.calcBMI();

  if (bmi1 > bmi2) {
    console.log(`${p1.fullName} has the higher BMI (${bmi1.toFixed(2)})`);
  } else if (bmi2 > bmi1) {
    console.log(`${p2.fullName} has the higher BMI (${bmi2.toFixed(2)})`);
  } else {
    console.log(`Both have the same BMI (${bmi1.toFixed(2)})`);
  }
}

compareBMI(person1, person2);


// Exercise 2 : Grade Average

// Function to calculate average
function findAvg(gradesList) {
  let sum = 0;
  for (let grade of gradesList) {
    sum += grade;
  }
  let avg = sum / gradesList.length;
  console.log(`Average is: ${avg.toFixed(2)}`);

  if (avg > 65) {
    console.log("Congratulations, you passed!");
  } else {
    console.log("You failed. You must repeat the course.");
  }
}

// Example usage
findAvg([70, 80, 60, 90, 85]);  // passed
findAvg([40, 55, 60]);          // failed


// Bonus: Split into two functions

function calculateAverage(gradesList) {
  let sum = 0;
  for (let grade of gradesList) {
    sum += grade;
  }
  return sum / gradesList.length;
}

function checkResult(gradesList) {
  const avg = calculateAverage(gradesList);
  console.log(`Average is: ${avg.toFixed(2)}`);
  if (avg > 65) {
    console.log("Congratulations, you passed!");
  } else {
    console.log("You failed. You must repeat the course.");
  }
}

// Example usage
checkResult([90, 80, 70]); 
checkResult([50, 40, 60]);
