/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
// Here, we test the browser-specific functionality of Trianglify.
import trianglify from './trianglify.js';

describe('Pattern generation', () => {
  test('return a Pattern given valid options', () => {
    expect(trianglify({ height: 100, width: 100 })).toBeInstanceOf(trianglify.Pattern);
  });

  test('should be random by default', () => {
    const pattern1 = trianglify();
    const pattern2 = trianglify();
    expect(pattern1.toSVG()).not.toEqual(pattern2.toSVG());
  });

  test('should be deterministic when seeded', () => {
    const pattern1 = trianglify({ seed: 'deadbeef' });
    const pattern2 = trianglify({ seed: 'deadbeef' });
    expect(pattern1.toSVG()).toEqual(pattern2.toSVG());
  });

  test('should match snapshot for non-breaking version bumps', () => {
    expect(trianglify({ seed: 'snapshotText' }).toSVG()).toMatchSnapshot();
  });
});

describe('Pattern outputs in browser environment', () => {
  describe('#toSVG', () => {
    test('returns a well-formed SVG node', () => {
      const pattern = trianglify();
      const svgDOM = pattern.toSVG();
      expect(svgDOM.tagName).toEqual('svg');
      expect(svgDOM.children).toBeInstanceOf(global.HTMLCollection);
      Array.from(svgDOM.children).forEach(node => {
        expect(node.tagName).toEqual('path');
      });
      expect(svgDOM.children).toHaveLength(pattern.polys.length);
    });

    test('supports rendering to the destSVG target', () => {
      const destSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      expect(destSVG.children).toHaveLength(0);
      const pattern = trianglify({ seed: 'destSVG works' });
      // side-effect-ful render to destSVG
      pattern.toSVG(destSVG);
      expect(destSVG.children).toHaveLength(pattern.polys.length);
      expect(destSVG).toMatchSnapshot();
    });
  });

  describe('#toSVGTree', () => {
    const pattern = trianglify({ seed: 'foobar' });
    const svgTree = pattern.toSVGTree();

    test('returns a synthetic tree of object literals', () => {
      expect(Object.keys(svgTree)).toEqual(['tagName', 'attrs', 'children', 'toString']);
    });

    test('serializes to an SVG string', () => {
      expect(svgTree.toString()).toMatchSnapshot();
    });
  });

  describe('#toCanvas', () => {
    test('returns a Canvas node', () => {
      const pattern = trianglify();
      const canvas = pattern.toCanvas();
      expect(canvas).toBeInstanceOf(global.HTMLElement);
      expect(canvas.tagName).toEqual('CANVAS');
      // there's not really any way to test the canvas contents here
    });
  });
});
