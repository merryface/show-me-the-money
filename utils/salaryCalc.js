// const cprCalc = require('./cprCalc.js');
import cprCalc from './cprCalc.js'
import nedCalc from './nedCalc.js'
import hedCalc from './hedCalc.js'
import lateHomeCalc from './lateHomeCalc.js'
import vacationSellOffCalc from './vacationSellOffCalc';

export default function salary({
    base = 0,
    isCaptain = false,
    dutyDays = 0,
    blockHours = 0,
    ccOnboard = false,
    apuAvail = true,
    tbpActive = false,
    tbpExtra = 0,
    tbpHours = 0,
    ned = 0,
    hed = 0,
    lateHome = 0,
    soldDays = 0,
  }) {
  // Guard
  if (typeof base != 'number') return "enter a valid number"
  if (base < 0) return "enter an amount above 0"

  // tbp base salary
  const base_pay = tbpActive ? base * (1 + (0.025 * tbpExtra/4)): base
  let total = base_pay

  // tbp flight pay
  if (tbpActive) total += tbpHours * 105

  // cpr
  total += cprCalc(blockHours, ccOnboard, apuAvail)

  // per diem
  total += dutyDays*70

  // extended days
  total += nedCalc(ned, isCaptain) + hedCalc(hed, isCaptain)

  // Late Home Payments
  total += lateHomeCalc(lateHome, isCaptain)

  // Vacation Sell off
  total += vacationSellOffCalc(soldDays, base_pay)

  return total
}
