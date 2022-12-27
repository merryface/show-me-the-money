export default function cprCalc(blockHours, ccOnboard, apuAvail, natuk, natukHours) {
  if (blockHours <= 100) return 0
  let cpr = 0
  let rewardableHours = blockHours - 100

  if (rewardableHours > 0) cpr += rewardableHours * 70
  if (rewardableHours > 50) cpr += (rewardableHours - 50) * 25
  if (rewardableHours > 150) cpr += (rewardableHours - 150) * 10
  if (rewardableHours > 250) cpr += (rewardableHours - 250) * 5
  if (rewardableHours > 350) cpr += (rewardableHours - 350) * 5
  
  if (!ccOnboard && !apuAvail) cpr *= 1.5
  if (!ccOnboard && apuAvail) cpr *= 1.25
  if (natuk) {
    const natukFraction = natukHours/blockHours
    cpr += (cpr*natukFraction) *1.75
  }
  return cpr
}

