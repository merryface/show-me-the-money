function salary(
    base = 0,
    perDiem = 0,
    blockHours = 0,
    cprPaid = true,
    ccOnboard = false,
    apuAvail = true
  ) {
  let total = base

  // Guard
  if (typeof base != 'number') return "enter a valid number"
  if (base < 0) return "enter an amount above 0"

  // cpr
  let cpr = 0
  let rewardableHours = blockHours - 100

  if (rewardableHours > 0) cpr += rewardableHours * 70

  if (cprPaid) {
    if (!ccOnboard && !apuAvail) cpr *= 1.5
  }
  
  total += cpr

  perdiemPay = perDiem*70
  total += perdiemPay

  return total
}

module.exports = salary;