const trianglify = require('../../dist/trianglify.js');
const fs = require('fs');

// Generate a trianglify pattern
const pattern = trianglify({
  width: 1920,
  height: 1080,
  cellSize: 100,
  variance: 0.75,
  seed: 'example'
}).toCanvas();

// Save the buffer to a file. See the node-canvas docs for a full
// list of all the things you can do with this Canvas object:
// https://github.com/Automattic/node-canvas
const file = fs.createWriteStream('trianglify.png');
canvas.createPNGStream().pipe(file);
