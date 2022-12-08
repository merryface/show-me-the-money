export default function cprCalc(cprPaid, blockHours, ccOnboard, apuAvail) {
  if (!cprPaid) return 0

  let cpr = 0
  let rewardableHours = blockHours - 100

  if (rewardableHours > 0) cpr += rewardableHours * 70
  if (rewardableHours > 50) cpr += (rewardableHours - 50) * 25
  if (rewardableHours > 150) cpr += (rewardableHours - 150) * 10
  if (rewardableHours > 250) cpr += (rewardableHours - 250) * 5
  if (rewardableHours > 350) cpr += (rewardableHours - 350) * 5

  if (cprPaid) {
    if (!ccOnboard && !apuAvail) cpr *= 1.5
    if (!ccOnboard && apuAvail) cpr *= 1.25
  }

  return cpr
}

// module.exports = cprCalc;
