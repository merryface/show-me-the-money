const salary = require('../index.js');

test('check that input is a number', () => {
  expect(salary("hello")).toBe("enter a valid number");
  expect(salary(true)).toBe("enter a valid number");
})

test('check that input is more than 0', () => {
  expect(salary(-100)).toBe("enter an amount above 0");
})

test('returns 0', () => {
  expect(salary()).toBe(0);
});

test('returns base salary when no extras', () => {
  expect(salary(100)).toBe(100);
  expect(salary(50000)).toBe(50000);
});

