const fs = require('fs');
const path = require('path');
fs.readFile(path.resolve('package.json'), 'utf8', (err, data) => {
    if (err) throw new Error(err);
    
    const file = JSON.parse(data);
    file.version = file.version.split('.');
    file.version[2] = Number(file.version[2]) + 1;
    file.version = file.version.join('.');

    fs.writeFile(path.resolve('package.json'), JSON.stringify(file, null, 2), () => {
        console.log('INCREMENTED VERSION');
    });
});