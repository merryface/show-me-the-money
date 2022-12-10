export default function nedCalc(ned_days, isCaptain) {
  const ned_rate = isCaptain ? 835 : 655
  return ned_rate * ned_days
}