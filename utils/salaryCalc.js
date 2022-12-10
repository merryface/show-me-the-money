// const cprCalc = require('./cprCalc.js');
import cprCalc from './cprCalc.js'
import nedCalc from './nedCalc.js'
import hedCalc from './hedCalc.js'

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
  }) {
  // Guard
  if (typeof base != 'number') return "enter a valid number"
  if (base < 0) return "enter an amount above 0"

  // tbp base salary
  let total = tbpActive ? base * (1 + (0.025 * tbpExtra/4)): base

  // tbp flight pay
  if (tbpActive) total += tbpHours * 105

  // cpr
  const cpr = cprCalc(blockHours, ccOnboard, apuAvail)
  total += cpr

  // per diem
  const perdiemPay = dutyDays*70
  total += perdiemPay

  // extended days
  const ned_rate = isCaptain ? 835 : 655
  total += nedCalc(ned, isCaptain) + hedCalc(hed, isCaptain)


  // Late Home Payments
  const lateHomeRate = ned_rate / 2
  total += lateHome*lateHomeRate

  return total
}
