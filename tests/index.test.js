const salary = require('../index.js');

test('check that input is a number', () => {
  expect(salary({base: "hello"})).toBe("enter a valid number");
  expect(salary({base: true})).toBe("enter a valid number");
})

test('check that input is more than 0', () => {
  expect(salary({base: -100})).toBe("enter an amount above 0");
})

test('returns 0', () => {
  expect(salary({})).toBe(0);
});

test('returns base salary when no extras', () => {
  expect(salary({base: 100})).toBe(100);
  expect(salary({base: 50000})).toBe(50000);
});

test('returns salary plus per diem times duty days', () => {
  expect(salary({base: 58500, dutyDays: 200})).toBe(72500)
  expect(salary({base: 58500, dutyDays: 202})).toBe(72640)
})

test('adds CPR productivity for aircraft with no cc or apu', () => {
  let input = {
    base: 58500,
    dutyDays: 200,
    blockHours: 90,
    cprPaid: true,
    ccOnboard: false,
    apuAvail: false,
  }
  expect(salary(input)).toBe(72500)
  input.blockHours = 100
  expect(salary(input)).toBe(72500)
  input.blockHours = 150
  expect(salary(input)).toBe(77750)
  input.blockHours = 250
  expect(salary(input)).toBe(92000)
  input.blockHours = 350
  expect(salary(input)).toBe(107750)
  input.blockHours = 450
  expect(salary(input)).toBe(124250)
  input.blockHours = 500
  expect(salary(input)).toBe(132875)
})

test('adds CPR productivity for aircraft with no cc and with apu', () => {
  let input = {
    base: 58500,
    dutyDays: 200,
    blockHours: 150,
    cprPaid: true,
    ccOnboard: false,
    apuAvail: true,
  }

  expect(salary(input)).toBe(76875)
  input.blockHours = 350
  expect(salary(input)).toBe(101875)
  input.blockHours = 500
  expect(salary(input)).toBe(122812.5)
})

test('adds CPR productivity for aircraft with cc and apu', () => {
  let input = {
    base: 58500,
    dutyDays: 200,
    blockHours: 150,
    cprPaid: true,
    ccOnboard: true,
    apuAvail: true,
  }

  expect(salary(input)).toBe(76000)
  input.blockHours = 350
  expect(salary(input)).toBe(96000)
  input.blockHours = 500
  expect(salary(input)).toBe(112750)
})


test('CPR not applied', () => {
  let input = {
    base: 58500,
    dutyDays: 200,
    blockHours: 150,
    cprPaid: false,
    ccOnboard: true,
    apuAvail: true,
  }

  expect(salary(input)).toBe(72500)
  input.blockHours = 350
  expect(salary(input)).toBe(72500)
  input.blockHours = 500
  expect(salary(input)).toBe(72500)
})

test('tour based pay salary correction', () => {
  let input = {
    base: 58500,
    dutyDays: 200,
    blockHours: 150,
    cprPaid: false,
    ccOnboard: true,
    apuAvail: true,
    tbpActive: true,
    tbpExtra: 4,
  }

  expect(salary(input)).toBe(73962.5)
  input.tbpExtra = 8
  expect(salary(input)).toBe(75425)
  input.tbpExtra = 12
  expect(salary(input)).toBe(76887.5)
  input.tbpExtra = 16
  expect(salary(input)).toBe(78350)
  input.tbpExtra = 20
  expect(salary(input)).toBe(79812.5)
})

test('Add TBP flight pay', () => {
  let input = {
    base: 58500,
    dutyDays: 200,
    blockHours: 150,
    cprPaid: false,
    ccOnboard: true,
    apuAvail: true,
    tbpActive: true,
    tbpExtra: 4,
    tbpHours: 100,
  }

  expect(salary(input)).toBe(84462.5)
  input.tbpHours = 200
  expect(salary(input)).toBe(94962.5)
})

test('test adding normal extended days', () => {
  let input = {
    base: 58500,
    dutyDays: 200,
    blockHours: 150,
    cprPaid: false,
    ccOnboard: true,
    apuAvail: true,
    ned: 2
  }

  expect(salary(input)).toBe(73800)
  input.ned = 4
  expect(salary(input)).toBe(75100)
})

test('test adding high extended days', () => {
  let input = {
    base: 58500,
    dutyDays: 200,
    blockHours: 150,
    cprPaid: false,
    ccOnboard: true,
    apuAvail: true,
    hed: 2
  }

  expect(salary(input)).toBe(74200)
  input.hed = 4
  expect(salary(input)).toBe(75900)
})