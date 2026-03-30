const { add, divide } = require('./math');

describe('Math Test', () => {

  test('add 1 + 2 = 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('add negatif', () => {
    expect(add(-1, -1)).toBe(-2);
  });

  test('divide 10 / 2 = 5', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('divide by zero', () => {
    expect(() => divide(10, 0)).toThrow();
  });

  test('divide desimal', () => {
    expect(divide(5, 2)).toBe(2.5);
  });

});
