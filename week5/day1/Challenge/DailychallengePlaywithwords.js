// 1st daily challenge
function makeAllCaps(arr) {
    return new Promise((resolve, reject) => {
        if (arr.every(item => typeof item === "string")) {
            resolve(arr.map(item => item.toUpperCase()));
        } else {
            reject("Array contains non-string elements");
        }
    });
}

function sortWords(arr) {
    return new Promise((resolve, reject) => {
        if (arr.length > 4) {
            resolve(arr.sort());
        } else {
            reject("Array must contain more than 4 elements");
        }
    });
}

makeAllCaps([1, "pear", "banana"])
    .then(sortWords)
    .then(console.log)
    .catch(console.log);

makeAllCaps(["apple", "pear", "banana"])
    .then(sortWords)
    .then(console.log)
    .catch(console.log);

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
    .then(sortWords)
    .then(console.log)
    .catch(console.log);


// 2nd daily challenge
const morse = `{
  "0": "-----","1": ".----","2": "..---","3": "...--","4": "....-",
  "5": ".....","6": "-....","7": "--...","8": "---..","9": "----.",
  "a": ".-","b": "-...","c": "-.-.","d": "-..","e": ".","f": "..-.",
  "g": "--.","h": "....","i": "..","j": ".---","k": "-.-","l": ".-..",
  "m": "--","n": "-.","o": "---","p": ".--.","q": "--.-","r": ".-.",
  "s": "...","t": "-","u": "..-","v": "...-","w": ".--","x": "-..-",
  "y": "-.--","z": "--..",".": ".-.-.-",",": "--..--","?": "..--..",
  "!": "-.-.--","-": "-....-","/": "-..-.","@": ".--.-.","(": "-.--.",
  ")": "-.--.-"
}`;

function toJs(morse) {
    return new Promise((resolve, reject) => {
        try {
            const json = JSON.parse(morse);
            if (Object.keys(json).length === 0) reject("Empty object");
            resolve(json);
        } catch {
            reject("Invalid JSON");
        }
    });
}

function toMorse(morseObj) {
    return new Promise((resolve, reject) => {
        const str = prompt("Enter a string to convert to Morse code: ").toLowerCase();
        const chars = str.split("");
        if (chars.some(char => !morseObj[char])) reject("Unsupported character found");
        resolve(chars.map(char => morseObj[char]));
    });
}

function joinWords(morseTranslation) {
    const result = morseTranslation.join("\n");
    document.body.innerText = result;
    return result;
}

toJs(morse)
    .then(toMorse)
    .then(joinWords)
    .catch(console.log);
