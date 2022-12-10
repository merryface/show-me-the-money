export default function hedCalc(lateHome, isCaptain) {
  const ned_rate = isCaptain ? 835 : 655
  return lateHome * ned_rate / 2
}