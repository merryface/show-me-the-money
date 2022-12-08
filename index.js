const cprCalc = require('./utils/cprCalc.js');

function salary(
    base = 0,
    dutyDays = 0,
    blockHours = 0,
    cprPaid = true,
    ccOnboard = false,
    apuAvail = true
  ) {
  // Guard
  if (typeof base != 'number') return "enter a valid number"
  if (base < 0) return "enter an amount above 0"

  let total = base

  // cpr
  const cpr = cprCalc(cprPaid, blockHours, ccOnboard, apuAvail)
  total += cpr

  // per diem
  perdiemPay = dutyDays*70
  total += perdiemPay

  return total
}

module.exports = salary;