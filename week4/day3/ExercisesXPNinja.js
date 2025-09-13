class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink. 🌸");
    super();
  }
}

const pet = new Flamingo();
1
//output:
// I'm pink.🌸
// I'm a bird.🦢
// Explanation:
// 1. The Flamingo constructor runs first, logging "I'm pink. 🌸".
// 2. Then it calls super(), which invokes the Bird constructor.
// 3. The Bird constructor logs "I'm a bird. 🦢".
// Note: In derived classes, super() must be called before using 'this', but logging is allowed before super().