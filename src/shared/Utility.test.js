import { ComputeArithmetic } from './Utility';

describe('ComputeArithmetic', () => {
  test('computes simple addition', () => {
    expect(ComputeArithmetic('=1+2')).toBe(3);
  });

  test('computes simple subtraction', () => {
    expect(ComputeArithmetic('=5-3')).toBe(2);
  });

  test('computes multiplication', () => {
    expect(ComputeArithmetic('=2*3')).toBe(6);
  });

  test('computes division', () => {
    expect(ComputeArithmetic('=6/2')).toBe(3);
  });

  test('handles order of operations', () => {
    expect(ComputeArithmetic('=2+3*4')).toBe(14);
  });

  test('handles parentheses', () => {
    expect(ComputeArithmetic('=(2+3)*4')).toBe(20);
  });

  test('handles negative numbers', () => {
    expect(ComputeArithmetic('=5+-3')).toBe(2);
  });

  test('handles complex expression', () => {
    expect(ComputeArithmetic('=10/2+3*4-1')).toBe(16);
  });
});