// =============================
// Part 1: Video Class
// =============================

class Video {
  constructor(title, uploader, time) {
    this.title = title;     // title of the video
    this.uploader = uploader; // person who uploaded the video
    this.time = time;       // duration in seconds
  }

  // Method to display watch message
  watch() {
    return `${this.uploader} watched all ${this.time} seconds of ${this.title}!`;
  }
}

// =============================
// Part 2: Instantiate Videos
// =============================

// First video instance
const video1 = new Video("JavaScript Tutorial", "John Doe", 300);
console.log(video1.watch());
// Output: John Doe watched all 300 seconds of JavaScript Tutorial!

// Second video instance
const video2 = new Video("CSS Basics", "Jane Smith", 180);
console.log(video2.watch());
// Output: Jane Smith watched all 180 seconds of CSS Basics!

// =============================
// Part 3: Bonus - Array of video data
// =============================

const videoData = [
  { title: "HTML Crash Course", uploader: "Alice", time: 240 },
  { title: "Node.js Tutorial", uploader: "Bob", time: 400 },
  { title: "React Guide", uploader: "Charlie", time: 350 },
  { title: "Python for Beginners", uploader: "Diana", time: 500 },
  { title: "Java Basics", uploader: "Eve", time: 300 }
];

// =============================
// Part 4: Instantiate Video instances from array
// =============================

const videoInstances = []; // array to hold Video objects

for (let data of videoData) {
  const video = new Video(data.title, data.uploader, data.time);
  videoInstances.push(video);
}

// =============================
// Part 5: Loop through instances and call watch method
// =============================

videoInstances.forEach(video => {
  console.log(video.watch());
});

/* Expected Output:
Alice watched all 240 seconds of HTML Crash Course!
Bob watched all 400 seconds of Node.js Tutorial!
Charlie watched all 350 seconds of React Guide!
Diana watched all 500 seconds of Python for Beginners!
Eve watched all 300 seconds of Java Basics!
*/
