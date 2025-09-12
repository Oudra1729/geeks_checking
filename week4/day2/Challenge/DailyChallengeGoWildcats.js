// --------------------------------------------------
// Data
// --------------------------------------------------
const gameInfo = [
  {
    username: "john",
    team: "red",
    score: 5,
    items: ["ball", "book", "pen"]
  },
  {
    username: "becky",
    team: "blue",
    score: 10,
    items: ["tape", "backpack", "pen"]
  },
  {
    username: "susy",
    team: "red",
    score: 55,
    items: ["ball", "eraser", "pen"]
  },
  {
    username: "tyson",
    team: "green",
    score: 1,
    items: ["book", "pen"]
  },
];

// --------------------------------------------------
// 1. Create an array of usernames with "!" at the end
// --------------------------------------------------
const usernames = [];
gameInfo.forEach(player => {
  usernames.push(player.username + "!");
});

console.log("Usernames with '!':", usernames);
// Expected: ["john!", "becky!", "susy!", "tyson!"]

// --------------------------------------------------
// 2. Create an array of usernames with score > 5
// --------------------------------------------------
const winners = [];
gameInfo.forEach(player => {
  if (player.score > 5) {
    winners.push(player.username);
  }
});

console.log("Winners:", winners);
// Expected: ["becky", "susy"]

// --------------------------------------------------
// 3. Find the total score of all users
// --------------------------------------------------
let totalScore = 0;
gameInfo.forEach(player => {
  totalScore += player.score;
});

console.log("Total Score:", totalScore);
// Expected: 71
