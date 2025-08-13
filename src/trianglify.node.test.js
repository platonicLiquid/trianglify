/**
 * @jest-environment node
 */
/* eslint-env jest */
// Here, we test the node-specific functionality of Trianglify.
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

  test('should match snapshot for non-breaking version bumps', () => {
    expect(trianglify({ seed: 'snapshotText' }).toSVG().toString()).toMatchSnapshot();
  });
});

describe('Pattern outputs in a node environment', () => {
  describe('#toSVG', () => {
    const pattern = trianglify();
    const svgTree = pattern.toSVG();

    test('returns a synthetic tree of object literals', () => {
      expect(Object.keys(svgTree)).toEqual(['tagName', 'attrs', 'children', 'toString']);
    });
  });
});
