const fs = require('fs');
const path = require('path');

function readFileContent() {
    const filePath = path.join(__dirname, 'files', 'file-data.txt');
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log("File content:", content);
}

module.exports = readFileContent;
