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

test('returns salary plus per diem times duty days', () => {
  expect(salary(58500, 200)).toBe(72500)
  expect(salary(58500, 202)).toBe(72640)
})

test('adds CPR productivity for aircraft with no cc or apu', () => {
  expect(salary(58500, 200, 90, true, false, false)).toBe(72500)
  expect(salary(58500, 200, 100, true, false, false)).toBe(72500)
  expect(salary(58500, 200, 150, true, false, false)).toBe(77750)
  expect(salary(58500, 200, 250, true, false, false)).toBe(92000)
  expect(salary(58500, 200, 350, true, false, false)).toBe(107750)
  expect(salary(58500, 200, 450, true, false, false)).toBe(124250)
  expect(salary(58500, 200, 500, true, false, false)).toBe(132875)
})

test('adds CPR productivity for aircraft with no cc and with apu', () => {
  expect(salary(58500, 200, 150, true, false, true)).toBe(76875)
  expect(salary(58500, 200, 350, true, false, true)).toBe(101875)
  expect(salary(58500, 200, 500, true, false, true)).toBe(122812.5)
})

test('adds CPR productivity for aircraft with cc and apu', () => {
  expect(salary(base=58500, dutyDays=200, blockHours=150, cprPaid=true, ccOnboard=true, apuAvail=true)).toBe(76000)
  expect(salary(58500, 200, 350, true, true, true)).toBe(96000)
  expect(salary(58500, 200, 500, true, true, true)).toBe(112750)
})