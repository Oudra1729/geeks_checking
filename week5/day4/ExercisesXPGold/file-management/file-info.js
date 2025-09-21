const fs = require('fs');
const path = require('path');

function fileInfo() {
    const filePath = path.join(__dirname, 'data', 'example.txt');
    console.log('File exists:', fs.existsSync(filePath));

    const stats = fs.statSync(filePath);
    console.log('File size:', stats.size, 'bytes');
    console.log('Creation time:', stats.birthtime);
}

module.exports = fileInfo;
