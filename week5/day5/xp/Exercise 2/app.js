import { people } from "./data.js";

function averageAge(persons) {
  const total = persons.reduce((sum, p) => sum + p.age, 0);
  return total / persons.length;
}

console.log("Average age:", averageAge(people));
