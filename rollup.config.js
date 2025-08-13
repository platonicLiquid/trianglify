import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default [
  { // build for node & module bundlers (CommonJS)
    input: 'src/trianglify.js',
    external: ['chroma-js', 'delaunator'],
    output: { file: 'dist/trianglify.js', format: 'cjs' }
  },
  { // build for ES modules
    input: 'src/trianglify.js',
    external: ['chroma-js', 'delaunator'],
    output: { file: 'dist/trianglify.esm.js', format: 'es' }
  },
  {
    // build bundle for browser use (includes dependencies)
    input: 'src/trianglify.js',
    plugins: [resolve({ browser: true }), commonjs()],
    output: { file: 'dist/trianglify.bundle.js', format: 'umd', name: 'trianglify' }
  },
  {
    // build debug bundle for browser use (includes dependencies, not minified)
    input: 'src/trianglify.js',
    plugins: [resolve({ browser: true }), commonjs()],
    output: { file: 'dist/trianglify.bundle.debug.js', format: 'umd', name: 'trianglify' }
  }
];
