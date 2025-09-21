const fs = require('fs');
const path = require('path');

function readFile(fileName) {
    const filePath = path.join(__dirname, '..', fileName);
    if(fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        console.log('File content:', content);
    } else {
        console.log('File not found:', fileName);
    }
}

module.exports = readFile;
