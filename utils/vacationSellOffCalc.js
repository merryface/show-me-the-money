export default function vacationSellOffCalc(soldDays, base) {
  // 0.5% base increase per sold vacation day 
  return base * 0.05 * soldDays
}