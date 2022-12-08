const cprCalc = require('./cprCalc.js');

function salary({
    base = 0,
    dutyDays = 0,
    blockHours = 0,
    cprPaid = true,
    ccOnboard = false,
    apuAvail = true,
    tbpActive = false,
    tbpExtra = 0,
    tbpHours = 0,
    ned = 0,
    hed = 0,
  }) {
  // Guard
  if (typeof base != 'number') return "enter a valid number"
  if (base < 0) return "enter an amount above 0"

  // tbp base salary
  let total = tbpActive ? base * (1 + (0.025 * tbpExtra/4)): base

  // tbp flight pay
  if (tbpActive) total += tbpHours * 105

  // cpr
  const cpr = cprCalc(cprPaid, blockHours, ccOnboard, apuAvail)
  total += cpr

  // per diem
  perdiemPay = dutyDays*70
  total += perdiemPay

  // extended days
  total += ned*650
  total += hed*850

  return total
}

module.exports = salary;