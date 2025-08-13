const trianglify = require('trianglify');

console.log('Trianglify loaded successfully!');

try {
  const pattern = trianglify({
    width: 800,
    height: 600,
    cellSize: 50
  });
  
  console.log('Pattern created successfully');
  console.log('Pattern methods:', Object.getOwnPropertyNames(pattern));
  
  const svg = pattern.toSVG();
  console.log('SVG generated successfully');
  
  if (typeof pattern.toCanvas === 'function') {
    console.log('toCanvas method still exists');
  } else {
    console.log('toCanvas method removed as expected');
  }
  
} catch (error) {
  console.error('Error occurred:', error.message);
}
