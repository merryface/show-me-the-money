import salary from './salaryCalc.js';
import cprCalc from './cprCalc.js';
import nedCalc from './nedCalc.js'
import hedCalc from './hedCalc.js'
import lateHomeCalc from './lateHomeCalc.js'
import vacationSellOffCalc from './vacationSellOffCalc.js';

const formatCurrency = value => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value)
const getEl = id => document.getElementById(id)
const getElValue = id => document.getElementById(id).value

export default function calculateListener(isCaptain, ccOnboard, apuAvail, net) {
  const tbpExtra = Number(getElValue('tbpExtra'))-200
  const tbpActive = tbpExtra > 0

  const base = Number(getElValue('base'))
  const dutyDays = Number(getElValue('dutyDays'))
  const blockHours = Number(getElValue('blockHours'))
  const tbpHours = Number(getElValue('tbpHours'))
  const ned = Number(getElValue('ned'))
  const hed = Number(getElValue('hed'))
  const lateHome = Number(getElValue('lateHome'))
  const soldDays = Number(getElValue('soldDays'))
  const tax = Number(getElValue('tax'))

  const total = salary({
    base,
    isCaptain,
    dutyDays,
    blockHours,
    ccOnboard,
    apuAvail,
    tbpActive,
    tbpExtra,
    tbpHours,
    ned,
    hed,
    lateHome,
    soldDays
  })

  let correctedBase = tbpActive ? base * (1 + (0.025 * tbpExtra/4)): base
  net = total - (total * (tax/100))
  const cpr = cprCalc(blockHours, ccOnboard, apuAvail)
  const tbp = tbpExtra > 0 ? (tbpHours * 105): 0

  const table_cells = [
    ['table_base', formatCurrency(correctedBase)],
    ['table_perDiem', formatCurrency((dutyDays*70))],
    ['table_cpr', formatCurrency(cpr)],
    ['table_tbp', formatCurrency(tbp)],
    ['table_ned', formatCurrency(nedCalc(ned, isCaptain))],
    ['table_hed', formatCurrency(hedCalc(hed, isCaptain))],
    ['table_lateHome', formatCurrency(lateHomeCalc(lateHome, isCaptain), isCaptain)],
    ['table_soldDays', formatCurrency(vacationSellOffCalc(soldDays,correctedBase))],
    ['table_tax', formatCurrency(-(tax/100)*total)],
    ['table_soldDays', formatCurrency(vacationSellOffCalc(soldDays,correctedBase))],
    ['table_beforeTax', formatCurrency(total)],
    ['table_afterTax', formatCurrency(net)],
  ]

  table_cells.forEach(cell => getEl(cell[0]).innerText = `${cell[1]}`)
  getEl("breakdown").scrollIntoView({behavior: "smooth"})

  const feb = Number(base/12 + (dutyDays*70)/12 + cpr)
  const tax_multiplier = 1 - tax/100
  const monthly_table_cells = [
    ['tableMonth_nonTbp', formatCurrency(base/12 + (dutyDays*70)/12)],
    ['tableMonth_Tbp', formatCurrency(base/12 + (dutyDays*70)/12 + tbp/4)],
    ['tableMonth_feb', formatCurrency(feb)],
    ['tableMonth_nonTbp_after', formatCurrency((base/12 + (dutyDays*70)/12) * tax_multiplier)],
    ['tableMonth_Tbp_after', formatCurrency(base/12 + ((dutyDays*70)/12 + tbp/4) * tax_multiplier)],
    ['tableMonth_feb_after', formatCurrency(feb * tax_multiplier)
],
  ]
  
  monthly_table_cells.forEach(cell => getEl(cell[0]).innerText = `${cell[1]}`)

}