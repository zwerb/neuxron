const fs = require("fs");

fs.readFile('image.jpg', function(err, data) {
  if (err) throw err;

  // Encode to base64
  var encodedImage = new Buffer(data, 'binary').toString('base64');

  // Decode from base64
  var decodedImage = new Buffer(encodedImage, 'base64').toString('binary');
});