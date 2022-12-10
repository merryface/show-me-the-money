export default function hedCalc(hed_days, isCaptain) {
  const hed_rate = isCaptain ? 1045 : 860
  console.log(isCaptain);
  
  return hed_rate * hed_days
}