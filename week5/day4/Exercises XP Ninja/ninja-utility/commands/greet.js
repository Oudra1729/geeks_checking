const chalk = require('chalk');

function greet() {
    console.log(chalk.green.bold('Hello, Ninja! Welcome to your command-line utility.'));
}

module.exports = greet;
