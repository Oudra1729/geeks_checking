const prompt = require('prompt-sync')();

function validateName() {
    const fullName = prompt('Enter your full name: ');

    const regex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    if (regex.test(fullName)) {
        console.log('Valid name:', fullName);
    } else {
        console.log('Invalid name. Ensure first letters are uppercase and only one space.');
    }
}

module.exports = validateName;
