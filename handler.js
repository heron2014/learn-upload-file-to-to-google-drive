var fs = require('fs');

var file = __dirname + '/cv.pdf';

//encode file data to base64 encoded string
var base64 = fs.readFileSync(file, 'base64');

console.log(base64);

fs.writeFileSync(__dirname + '/pdftest.pdf', base64, 'base64');