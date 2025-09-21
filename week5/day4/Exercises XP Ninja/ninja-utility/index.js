const { program } = require('commander');
const greet = require('./commands/greet');
const fetchData = require('./commands/fetch');
const readFile = require('./commands/read');

program
    .command('greet')
    .description('Display a colorful greeting message')
    .action(greet);

program
    .command('fetch')
    .description('Fetch data from API')
    .action(fetchData);

program
    .command('read <filename>')
    .description('Read and display file content')
    .action(readFile);

program.parse(process.argv);
