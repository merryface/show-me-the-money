// const cprCalc = require('./cprCalc.js');
import cprCalc from './cprCalc.js'

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
  const ned_rate = isCaptain ? 850 : 650
  const hed_rate = isCaptain ? 1050 : 850
  total += ned*ned_rate
  total += hed*hed_rate

  return total
}
