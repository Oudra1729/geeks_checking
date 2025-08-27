// Daily Challenge: Star Pattern

// Using one loop
let n = 6; // number of lines
let pattern = "";
for (let i = 1; i <= n; i++) {
  pattern += "* ".repeat(i) + "\n";
}
console.log("Pattern with one loop:\n" + pattern);


// Using nested loops
let pattern2 = "";
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    pattern2 += "* ";
  }
  pattern2 += "\n";
}
console.log("Pattern with nested loops:\n" + pattern2);
