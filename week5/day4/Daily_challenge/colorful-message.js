const chalk = require('chalk').default;


function showColorfulMessage() {
    console.log(chalk.blue('This is a blue message!'));
    console.log(chalk.green('This is a green message!'));
    console.log(chalk.red.bold('This is a bold red message!'));
}

module.exports = showColorfulMessage;
