const fs = require('fs');
const callback = (err, file) => {
    console.log(file);
}

fs.readFile('./test.txt', {
    encoding: 'utf-8'
}, callback);